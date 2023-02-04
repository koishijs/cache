import { Context, Service } from 'koishi'

declare module 'koishi' {
  interface Context {
    __cache__: Cache
    cache<K extends keyof Tables>(key: K): CacheTable<Tables[K]>
  }
}

export interface Tables {
  default: any
}

class CacheTable<T> {
  constructor(public ctx: Context, public table: keyof Tables, public config: CacheTable.Config = {}) {}

  clear() {
    return this.ctx.__cache__.clear(this.table)
  }

  get(key: string): Promise<T> {
    return this.ctx.__cache__.get(this.table, key)
  }

  set(key: string, value: T, maxAge = this.config.maxAge) {
    return this.ctx.__cache__.set(this.table, key, value, maxAge)
  }

  delete(key: string) {
    return this.ctx.__cache__.delete(this.table, key)
  }
}

namespace CacheTable {
  export interface Config {
    maxAge?: number
  }
}

abstract class Cache extends Service {
  constructor(ctx: Context) {
    super(ctx, '__cache__')
  }

  public cache<K extends keyof Tables>(table?: K, config?: CacheTable.Config): CacheTable<Tables[K]> {
    return new CacheTable(this.ctx, table || 'default', config)
  }

  abstract clear(table: string): Promise<void>
  abstract get(table: string, key: string): Promise<any>
  abstract set(table: string, key: string, value: any, maxAge?: number): Promise<void>
  abstract delete(table: string, key: string): Promise<void>
}

Context.service('__cache__', {
  methods: ['cache'],
})

export default Cache
