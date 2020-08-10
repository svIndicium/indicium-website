import Vue from 'vue'
import axios from 'axios'
import { Service } from 'axios-middleware'
import DataMiddleware from '../middleware/api'

const api = {}
api.install = (Vue) => {
  const baseURL = process.env.NUXT_ENV_MODE === 'live'
    ? 'https://api.indicium.hu/api/v1'
    : process.env.NUXT_ENV_MODE === 'dev'
      ? 'https://dev.api.indicium.hu/api/v1'
      : 'https://localhost:8080/api/v1'

  const apiInstance = axios.create({ baseURL })

  const service = new Service(apiInstance)

  service.register([
    new DataMiddleware(),
  ])
  Vue.prototype.$api = apiInstance
}

Vue.use(api)
