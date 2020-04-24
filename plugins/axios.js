import Vue from 'vue'
import axios from 'axios'
import { Service } from 'axios-middleware'
import DataMiddleware from '../middleware/api'

const api = {}
api.install = (Vue) => {
  const baseURL = process.env.NUXT_ENV_APP_BRANCH === 'dev'
    ? 'http://localhost:8080/api/v1'
    : process.env.NODE_ENV === 'production' && process.env.NUXT_ENV_APP_BRANCH === 'master'
      ? 'https://lit.indicium.hu/api/v1'
      : 'https://lit.dev.indicium.hu/api/v1'

  const apiInstance = axios.create({ baseURL })

  const service = new Service(apiInstance)

  service.register([
    new DataMiddleware(),
  ])
  Vue.prototype.$api = apiInstance
}

Vue.use(api)
