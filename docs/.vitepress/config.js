export default {
    title: 'Form Wizard Vue3',
    description: 'Just playing around.',
    base: '/form-wizard-vue3/',
    themeConfig: {
        nav: [
            {
                text: 'Demo',
                link: 'https://stackblitz.com/edit/vue-1bngkw?file=src%2FApp.vue'
            },
            {
                text: 'Github',
                link: 'https://github.com/bahadirsofuoglu/form-wizard-vue3'
            }
        ],
        sidebar: [
            {
                text: 'Getting Started',
                collapsible: true,
                items: [{ text: 'Installation', link: '/guide/installation' }]
            },
            {
                text: 'Api',
                collapsible: true,
                items: [
                    { text: 'Props', link: '/api/props' },
                    { text: 'Events', link: '/api/events' }
                ]
            },
            {
                text: 'Demo',
                collapsible: true,
                items: [
                    {
                        text: 'Templating with props',
                        link: '/api/prop-templating'
                    },
                    {
                        text: 'Templating with slots',
                        link: '/api/slot-templating'
                    }
                ]
            }
        ]
    }
}
