# 介绍

@koishijs/cache 提供了统一的数据缓存服务。

## 基本用法

缓存服务的用法非常简单：

```ts
import {} from '@koishijs/cache'

// 扩展 foo 表
declare module '@koishijs/cache' {
  interface Tables {
    foo: number
  }
}

await ctx.cache.set('foo', 'bar', 114514)
await ctx.cache.get('foo', 'bar') // 114514
```

在 [API](./api.md) 页面中可以查看更多用法。

## 相关生态

数据缓存作为抽象服务，可以被多个插件实现。以下是提供此服务的插件：

- [koishi-plugin-cache-database](./plugins/database.md)
- [koishi-plugin-cache-memory](./plugins/memory.md)
- [koishi-plugin-cache-redis](./plugins/redis.md)
