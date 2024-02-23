import { Context, Schema, Time } from 'koishi'
import Cache from '@koishijs/cache'

declare module 'koishi' {
  interface Tables {
    cache: CacheEntry
  }
}

interface CacheEntry {
  table: string
  key: string
  value: string
  expire: Date
}

class DatabaseCache extends Cache {
  static inject = ['database']

  constructor(ctx: Context, public config: DatabaseCache.Config) {
    super(ctx)

    ctx.model.extend('cache', {
      table: 'string(63)',
      key: 'string(63)',
      value: 'text',
      expire: 'timestamp',
    }, {
      primary: ['table', 'key'],
    })

    ctx.setInterval(async () => {
      await ctx.database.remove('cache', { expire: { $lt: new Date() } })
    }, config.refreshInterval)
  }

  private encode(data: any): string {
    return JSON.stringify(data)
  }

  private decode(record: string): any {
    return JSON.parse(record)
  }

  async clear(table: string) {
    await this.ctx.database.remove('cache', { table })
  }

  async get(table: string, key: string) {
    const [entry] = await this.ctx.database.get('cache', { table, key }, ['expire', 'value'])
    if (!entry) return
    if (entry.expire && +entry.expire < Date.now()) return
    return this.decode(entry.value)
  }

  async set(table: string, key: string, value: any, maxAge?: number) {
    const expire = maxAge ? new Date(Date.now() + maxAge) : null
    await this.ctx.database.upsert('cache', [{
      table,
      key,
      value: this.encode(value),
      expire,
    }])
  }

  async delete(table: string, key: string) {
    await this.ctx.database.remove('cache', { table, key })
  }

  async* keys(table: string) {
    const entries = await this.ctx.database.get('cache', { table }, ['expire', 'key'])
    yield* entries
      .filter(entry => !entry.expire || +entry.expire > Date.now())
      .map(entry => entry.key)
  }

  async* values(table: string) {
    const entries = await this.ctx.database.get('cache', { table }, ['expire', 'value'])
    yield* entries
      .filter(entry => !entry.expire || +entry.expire > Date.now())
      .map(entry => this.decode(entry.value))
  }

  async* entries(table: string) {
    const entries = await this.ctx.database.get('cache', { table }, ['expire', 'key', 'value'])
    yield* entries
      .filter(entry => !entry.expire || +entry.expire > Date.now())
      .map(entry => [entry.key, this.decode(entry.value)] as any)
  }
}

namespace DatabaseCache {
  export interface Config {
    refreshInterval?: number
  }

  export const Config: Schema<Config> = Schema.object({
    refreshInterval: Schema.number().default(Time.minute * 10).role('time').description('缓存刷新间隔。'),
  })
}

export default DatabaseCache
