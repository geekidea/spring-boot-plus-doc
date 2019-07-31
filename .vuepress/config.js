module.exports = {
  port: "3000",
  dest: "docs",
  ga: "UA-85414008-1",
  base: "/",
  markdown: {
    externalLinks: {
      target: '_blank', rel: 'noopener noreferrer'
    }
  },
  locales: {
    "/": {
      lang: "zh-CN",
      title: "spring-boot-plus",
      description: "spring boot快速开发脚手架"
    }
  },
  head: [["link", { rel: "icon", href: `/favicon.ico` }]],
  themeConfig: {
    repo: "geekidea/spring-boot-plus",
    docsRepo: "geekidea/spring-boot-plus-doc",
    editLinks: true,
    locales: {
      "/": {
        label: "简体中文",
        selectText: "Languages",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "指南",
            link: "/guide/"
          },
          {
            text: "配置",
            link: "/config/"
          },
          {
            text: "生态",
            items: [
              {
                text: "spring-boot-assembly",
                link: "https://gitee.com/geekidea/spring-boot-assembly"
              }
            ]
          },
          {
            text: "更新日志",
            link:
              ""
          }
        ],
        sidebar: {
          "/guide/": genGuideSidebar(true),
          "/config/": genConfigSidebar(true)
        }
      }
    }
  }
};

function genGuideSidebar() {
  return [
    {
      title: "快速入门",
      collapsable: false,
      children: ["", "quick-start","tree","project-config","config","pack","deploy","changelog"]
    },
    {
      title: "核心功能" ,
      collapsable: false,
      children: ["generator"]
    },
    {
      title: "技术栈集成",
      collapsable: false,
      children: ["stack"]
    },
    {
      title: "FAQ",
      collapsable: false,
      children: [
        "faq"
      ]
    }
  ]
}

function genConfigSidebar() {
  return [
    {
      title: "配置" ,
      collapsable: false,
      children: ["", "generator-config"]
    }
  ]
}
