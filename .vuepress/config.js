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
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/'
            },
            {
                text: 'References',
                items: [{
                        text: 'API',
                        link: '/api/'
                    },
                    // {
                    //     text: 'CLI',
                    //     link: '/cli/'
                    // }
                ]
            },
            {
                text: 'Learn more',
                link: '/more-info/'
            },
        ],
        sidebar: {
            '/guide/': [
                ''
            ],
            '/more-info/': [
                '',
                'contact'
            ],

            '/api/': [
                '',
                'plugins',
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