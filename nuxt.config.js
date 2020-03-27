/* eslint-disable */
import content from './content.json'

console.log(JSON.stringify(content.pages, null, 2))

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: 'Indicium - De studievereniging voor ICT bij Hogeschool Utrecht',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicons/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/x-icon',
      href: '/favicons/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicons/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicons/favicon.ico'
    },
    {
      rel: 'manifest',
      href: '/favicons/site.webmanifest'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/daygrid/main.css'
    }]
  },
  loading: {
    color: '#72c9e0'
  },
  css: [
    '~/node_modules/normalize.css/normalize.css',
    '@/assets/scss/main.scss'
  ],
  plugins: [
    {
      src: '~/plugins/full-calendar',
      ssr: false
    },
    {
      src: '~/plugins/slick',
      ssr: false
    },
    {
      src: '~/plugins/busje',
      ssr: false
    },
    {
      src: '~/plugins/axios',
      ssr: false
    },
  ],
  modules: [
    '@nuxtjs/google-analytics',
    ['@nuxtjs/google-tag-manager', {id: 'GTM-TPDRMLG'}]
  ],
  generate: {
    // routes: () => {
    //   return axios.get('http://localhost:3000/content.json') // not working :(
    //     .then(res => {
    //       return res.data.pages.map(page => {
    //         return {
    //           route: page.slug,
    //           payload: page
    //         }
    //       })
    //     })
    // }
  },
  build: {
    extend(config, ctx) {
      ctx.isDev = false
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        }, {
          test: /\.(png|jpe?g|gif|svg|webp)$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1kB
            name: 'img/[name].[hash:7].[ext]'
          }
        }, {
          test: /\.(woff?2||eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1kB
            name: 'fonts/[name].[hash:7].[ext]'
          }
        })
      }
    }
  },
  googleAnalytics: {
    id: 'UA-147953098-1'
  }
}
