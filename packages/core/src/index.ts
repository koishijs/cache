import { Awaitable, Context, Service } from 'koishi'

declare module 'koishi' {
  interface Context {
    cache: Cache
  }
}

export interface Tables {
  default: any
}

abstract class Cache extends Service {
  static [Service.provide] = 'cache'

  constructor(ctx: Context) {
    super(ctx, 'cache')
  }

  abstract clear<K extends keyof Tables>(table: K): Promise<void>
  abstract get<K extends keyof Tables>(table: K, key: string): Promise<Tables[K]>
  abstract set<K extends keyof Tables>(table: K, key: string, value: Tables[K], maxAge?: number): Promise<void>
  abstract delete<K extends keyof Tables>(table: K, key: string): Promise<void>
  abstract keys<K extends keyof Tables>(table: K): AsyncIterable<string>
  abstract values<K extends keyof Tables>(table: K): AsyncIterable<Tables[K]>
  abstract entries<K extends keyof Tables>(table: K): AsyncIterable<[string, Tables[K]]>

  async forEach<K extends keyof Tables>(table: K, callback: (value: Tables[K], key: string) => Awaitable<void>) {
    const tasks: Awaitable<void>[] = []
    for await (const [key, value] of this.entries(table)) {
      tasks.push(callback(value, key))
    }
    await Promise.all(tasks)
  }
}

export default Cache
