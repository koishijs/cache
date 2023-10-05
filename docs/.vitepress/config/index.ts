import { defineConfig } from '@koishijs/vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '@koishijs/cache',
  description: 'Koishi 缓存服务',

  locales: {
    'zh-CN': require('./zh-CN'),
  },

  themeConfig: {
    indexName: 'koishi-cache',
    socialLinks: {
      github: 'https://github.com/koishijs/cache',
    },
  },
})
