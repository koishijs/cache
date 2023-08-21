import { Context, Dict, Schema } from 'koishi'
import Cache, { Tables } from '@koishijs/cache'

interface Entry {
  value: any
  timer?: NodeJS.Timeout
}

class MemoryCache extends Cache {
  private store: Dict<Dict<Entry>> = Object.create(null)

  constructor(ctx: Context, private config: MemoryCache.Config) {
    super(ctx)
  }

  stop() {
    for (const name in this.store) {
      this.clear(name)
    }
  }

  private table(name: string): Dict<Entry> {
    return this.store[name] ??= Object.create(null)
  }

  async clear(name: string) {
    const table = this.table(name)
    for (const key in table) {
      clearTimeout(table[key].timer)
    }
    delete this.store[name]
  }

  async get(name: string, key: string) {
    const table = this.table(name)
    return table[key]?.value
  }

  async set(name: string, key: string, value: any, maxAge?: number) {
    this.delete(name, key)
    const table = this.table(name)
    table[key] = { value }
    if (maxAge) {
      table[key].timer = setTimeout(() => delete table[key], maxAge)
    }
  }

  async delete(name: string, key: string) {
    const table = this.table(name)
    if (table[key]) {
      clearTimeout(table[key].timer)
      delete table[key]
    }
  }

  async keys<K extends 'default'>(table: K): Promise<string[]> {
    const entries = this.table(table)

    return Object.keys(entries)
  }

  async values<K extends 'default'>(table: K): Promise<Tables[K][]> {
    const entries = this.table(table)

    return Object.values(entries).map(entry => entry.value)
  }

  async entries<K extends 'default'>(table: K): Promise<Record<string, Tables[K]>> {
    const entries = this.table(table)

    return Object.fromEntries(Object.entries(entries).map(([key, entry]) => [key, entry.value]))
  }

  async forEach<K extends 'default'>(table: K, callback: (key: string, value: Tables[K]) => void): Promise<void> {
    const entries = this.table(table)

    for (const key in entries) {
      callback(key, entries[key].value)
    }
  }
}

namespace MemoryCache {
  export interface Config { }

  export const Config: Schema<Config> = Schema.object({})
}

export default MemoryCache
