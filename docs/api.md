# API

## 公开方法

下面的公开方法可以直接通过 `ctx.cache()` 使用。


## 抽象方法

要实现资源存储服务，你需要创建一个 Cache 的派生类。下面将介绍这个类的抽象方法。

### CacheService.get(table, key)
### CacheService.set(table, key, value, maxAge?)
### CacheService.delete(table, key)
### CacheService.clear(table)
