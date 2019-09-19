module.exports = {
    base: "/",
    port: 5555,
    dest: "site",
    title: 'spring-boot-plus',
    description: 'Everyone can develop projects independently, quickly and efficiently！',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['script', {}, 'var _hmt = _hmt || []; (function() {var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?f5cf3abbd62a6b246284fc0259a2a17d"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();'],
        ['script', {}, 'console.log("%c                 _                    _                 _                _\\n                (_)                  | |               | |              | |\\n  ___ _ __  _ __ _ _ __   __ _ ______| |__   ___   ___ | |_ ______ _ __ | |_   _ ___\\n / __| \'_ \\\\| \'__| | \'_ \\\\ / _` |______| \'_ \\\\ / _ \\\\ / _ \\\\| __|______| \'_ \\\\| | | | / __|\\n \\\\__ \\\\ |_) | |  | | | | | (_| |      | |_) | (_) | (_) | |_       | |_) | | |_| \\\\__ \\\\\\n |___/ .__/|_|  |_|_| |_|\\\\__, |      |_.__/ \\\\___/ \\\\___/ \\\\__|      | .__/|_|\\\\__,_|___/\\n     | |                  __/ |                                   | |\\n     |_|                 |___/                                    |_|","color:blue");'],
        ['script', {}, 'console.log("%c      :: Spring Boot ::             (v2.1.8.RELEASE)","color:blue");console.log("%c      :: Spring Boot Plus ::        (v1.2.3.RELEASE)","color:blue");console.log("%c      :: spring-boot-plus ::        https://springboot.plus","color:blue");'],
        ['script', {}, 'console.log("%cWelcome to spring-boot-plus","color:blue");console.log("%cGITHUB：https://github.com/geekidea/spring-boot-plus","color:blue");console.log("%cGITEE：https://gitee.com/geekidea/spring-boot-plus","color:blue");console.log("%cBlog：https://geekidea.io","color:blue");console.log("%cEmail：springbootplus@aliyun.com","color:blue");'],
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'spring-boot-plus',
            description: '每个人都可以独立、快速、高效地开发项目！'
        },
        '/en/': {
            lang: 'en-US',
            title: 'spring-boot-plus',
            description: 'Everyone can develop projects independently, quickly and efficiently！'
        }
    },
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
                        text: "更新日志",
                        link: "https://github.com/geekidea/spring-boot-plus/blob/master/CHANGELOG.md"
                    },
                    {
                        text: "Java Api",
                        link: "http://geekidea.io/spring-boot-plus-apidocs/"
                    },
                    {
                        text: "项目主页",
                        link: "http://47.105.159.10:8888/"
                    },
                    {
                        text: "接口文档",
                        link: "http://47.105.159.10:8888/docs/"
                    }
                ],
                sidebar: {
                    "/guide/": genGuideSidebar(true),
                    "/config/": genConfigSidebar(true)
                }
            },
            "/en/": {
                label: "English",
                selectText: "Languages",
                editLinkText: "Edit this page on GitHub",
                lastUpdated: "Last Updated",
                nav: [
                    {
                        text: "Guide",
                        link: "/en/guide/"
                    },
                    {
                        text: "Config",
                        link: "/en/config/"
                    },
                    {
                        text: "Changelog",
                        link: "https://github.com/baomidou/mybatis-plus/blob/3.0/CHANGELOG.md"
                    },
                    {
                        text: "Java Api",
                        link: "http://geekidea.io/spring-boot-plus-apidocs/"
                    },
                    {
                        text: "Dashboard",
                        link: "http://47.105.159.10:8888/"
                    },
                    {
                        text: "Swagger",
                        link: "http://47.105.159.10:8888/docs/"
                    }

                ],
                sidebar: {
                    "/en/guide/": genGuideSidebar(false),
                    "/en/config/": genConfigSidebar(false)
                }
            }
        }

    }

};


function genGuideSidebar(isZh) {
    return [
        {
            title: isZh ? "快速入门" : "Getting Start",
            collapsable: false,
            children: [
                "",
                "quick-start",
                "project-config",
                "tree",
                "pack",
                "deploy",
            ]
        },
        {
            title: isZh ? "核心功能" : "Core",
            collapsable: false,
            children: [
                "generator",
                "springbootadmin",
                "centos-deploy",
                "upload-download-resource",
            ]
        },
        {
            title: "FAQ",
            collapsable: false,
            children: [
                "faq",
                "idea-spring-boot-plus",
                "eclipse-spring-boot-plus",
                "contact",
            ]
        }
    ]
}

function genConfigSidebar(isZh) {
    return [
        {
            title: isZh ? "配置" : "Config",
            collapsable: false,
            children: ["", "generator-config"]
        }
    ]
}
