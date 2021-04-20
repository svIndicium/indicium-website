import Vue from 'vue'
import axios from 'axios'
import { Service } from 'axios-middleware'
import DataMiddleware from '../middleware/api'

const api = {}
api.install = (Vue) => {
  const baseURL = {
    production: 'https://api.indicium.hu/api/v1',
    testing: 'https://dev.api.indicium.hu/api/v1',
    development: 'http://localhost:8080/api/v1'
  }[process.env.NODE_ENV || 'development']

  const apiInstance = axios.create({ baseURL })

  const service = new Service(apiInstance)

  service.register([
    new DataMiddleware(),
  ])
  Vue.prototype.$api = apiInstance
}

Vue.use(api)
