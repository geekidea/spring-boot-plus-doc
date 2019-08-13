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
      description: "每个人都可以独立、快速、高效地开发项目！"
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
            link: "/guide/quick-start"
          },
          {
            text: "配置",
            link: "/guide/config"
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
              "/guide/changelog"
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
      children: ["","quick-start","idea-spring-boot-plus","eclipse-spring-boot-plus","project-config","config","tree","pack","deploy","changelog"]
    },
    {
      title: "核心功能" ,
      collapsable: false,
      children: ["generator"]
    },
    {
      title: "技术栈集成",
      collapsable: false,
      children: ["springbootadmin"]
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
