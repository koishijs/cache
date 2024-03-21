# API

## 公开方法

### ctx.cache.get(table, key)

- **table:** `string` 表名
- **key:** `string` 键名
- 返回值: `Promise<any>`

获取缓存数据。

### ctx.cache.set(table, key, value, maxAge?)

- **table:** `string` 表名
- **key:** `string` 键名
- **value:** `any` 缓存数据
- **maxAge:** `number` 缓存时间 (毫秒)
- 返回值: `Promise<void>`

设置缓存数据。当未设置 `maxAge` 时，将使用缓存表的设置。

### ctx.cache.delete(table, key)

- **table:** `string` 表名
- **key:** `string` 键名
- 返回值: `Promise<void>`

删除缓存数据。

### ctx.cache.clear(table)

- **table:** `string` 表名
- 返回值: `Promise<void>`

清空缓存表。

### ctx.cache.keys(table)

- **table:** `string` 表名
- 返回值: `AsyncIterable<string>`

获取缓存表的所有键名。

### ctx.cache.values(table)

- **table:** `string` 表名
- 返回值: `AsyncIterable<any>`

获取缓存表的所有值。

### ctx.cache.entries(table)

- **table:** `string` 表名
- 返回值: `AsyncIterable<[string, any]>`

获取缓存表的所有键值对。

### ctx.cache.forEach(table, callback)

- **table:** `string` 表名
- **callback:** `(value: any, key: string) => Awaitable<void>`
- 返回值: `Promise<void>`

遍历缓存表。
