import { defineConfig } from '@koishijs/vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '@koishijs/cache',
  description: 'Koishi 缓存服务',

  head: [
    ['link', { rel: 'icon', href: 'https://koishi.chat/logo.png' }],
    ['link', { rel: 'manifest', href: 'https://koishi.chat/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  themeConfig: {
    sidebar: [{
      text: '指南',
      items: [
        { text: '介绍', link: './' },
        { text: 'API', link: './api' },
      ],
    }, {
      text: '插件',
      items: [
        { text: 'Database', link: './plugins/database' },
        { text: 'Memory', link: './plugins/memory' },
        { text: 'Redis', link: './plugins/redis' },
      ],
    }, {
      text: '更多',
      items: [
        { text: 'Koishi 官网', link: 'https://koishi.chat' },
        { text: '支持作者', link: 'https://afdian.net/a/shigma' },
      ],
    }],
  },
})
