import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/kotlin-share/',
  outDir:'docs',
  title: 'Kotlin后端开发指南',
  description: '写给Javaer的Kotlin指南',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '为什么使用Kotlin进行后端开发', link: '/guide/why-kotlin-backend' }
        ]
      },
      {
        text: '第一章：Kotlin语言介绍',
        items: [
          { text: '发展历史', link: '/guide/language-intro' }
        ]
      },
      {
        text: '第二章：Kotlin核心特性与优势',
        items: [
          { text: '现代语法特性', link: '/guide/features/conciseness' },
          { text: '空安全机制', link: '/guide/features/null-safety' },
          { text: '函数式编程', link: '/guide/features/functional-programming' },
          { text: '协程支持', link: '/guide/features/coroutines' },
          { text: 'Java互操作性', link: '/guide/features/java-interop' }
        ]
      },
      {
        text: '第三章：实战应用',
        items: [
          { text: 'Spring Boot集成', link: '/guide/practice/spring-boot' },
          { text: 'WebFlux开发', link: '/guide/practice/webflux' }
        ]
      },
      {
        text: '第四章：最佳实践',
        items: [
          { text: '编码规范', link: '/guide/best-practices/coding-conventions' },
          { text: '常见陷阱', link: '/guide/best-practices/common-pitfalls' },
          { text: '迁移策略', link: '/guide/best-practices/migration-strategy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/kt-vitepress' }
    ]
  }
})
