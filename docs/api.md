# API

## 公开方法

### ctx.cache(table?, options?)

- **table:** `string` 命名空间
- **options:** `TableConfig` 缓存配置
  - **options.maxAge:** `number` 默认的缓存时间 (毫秒)
- 返回值: `CacheTable`

创建一个缓存表。下面的方法都可以在缓存表上访问。

### table.get(key)

- **key:** `string` 键名
- 返回值: `Promise<any>`

获取缓存数据。

### table.set(key, value, maxAge?)

- **key:** `string` 键名
- **value:** `any` 缓存数据
- **maxAge:** `number` 缓存时间 (毫秒)
- 返回值: `Promise<void>`

设置缓存数据。当未设置 `maxAge` 时，将使用缓存表的设置。

### table.delete(key)

- **key:** `string` 键名
- 返回值: `Promise<void>`

删除缓存数据。

### table.clear()

- 返回值: `Promise<void>`

清空缓存表。

## 抽象方法

要实现资源存储服务，你需要创建一个 Cache 的派生类。并逐一实现以下方法：

```ts
import Cache from '@koishijs/cache'

export default class MyCache extends Cache {
  async get(table: string, key: string): Promise<any>
  async set(table: string, key: string, value: any, maxAge?: number): Promise<void>
  async delete(table: string, key: string): Promise<void>
  async clear(table: string): Promise<void>
}
```

请注意上述方法与缓存表的方法的区别：要实现的抽象方法比缓存表的方法多了一个 `table` 参数。
