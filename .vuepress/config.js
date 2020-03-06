module.exports = {
    title: 'opa-stack',
    description: '',
    host: '127.0.0.1',
    port: 8888,
    themeConfig: {
        lastUpdated: 'Last Updated',
        repo: 'opa-stack/opa-stack',
        docsRepo: 'opa-stack/opa-stack.github.io',
        docsBranch: 'source',
        editLinks: true,
        displayAllHeaders: true,
        algolia: {
            apiKey: '36d3bfffffae8b75ccbbdf5af03813ee',
            indexName: 'opa-stack'
        },
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                items: [
                    {
                        text: 'Intro',
                        link: '/guide/index'
                    },
                    {
                        text: 'Development',
                        items: [{
                                text: 'Info',
                                link: '/guide/development'
                            },
                            {
                                text: 'Optional components',
                                link: '/guide/optional-components'
                            },
                            {
                                text: 'Creating a new project',
                                link: '/guide/new-project'
                            },
                            {
                                text: 'Example projects',
                                link: '/guide/examples'
                            },
                        ]
                    }, {
                        text: 'API details',
                        items: [{
                                text: 'Configuration',
                                link: '/guide/api/configuration'
                            },
                            {
                                text: 'Plugin system',
                                link: '/guide/api/plugin-system'
                            },
                        ]
                    }
                ]
            },
            {
                text: 'Learn more',
                link: '/more-info/'
            },
        ],
        sidebar: {
            '/guide/': [
                '',
                {
                    title: 'Development',
                    collapsable: true,
                    children: [
                        ['development', 'Info'],
                        'optional-components',
                        'new-project',
                        'examples'

                    ]
                },

                {
                    title: 'API details',
                    collapsable: true,
                    children: [
                        'api/configuration',
                        'api/plugin-system'
                    ]
                }
            ],
            '/more-info/': [
                    '',
                    'contact'
            ]
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-158703319-1'
            }
        ]
    ],
}