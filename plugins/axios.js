import Vue from 'vue'
import axios from 'axios'

const instance = axios.create()

Vue.prototype.$http = instance

const baseURL = process.env.NUXT_ENV_BRANCH === 'dev'
  ? 'http://localhost:8080/api/v1'
  : process.env.NODE_ENV === 'production' && process.env.NUXT_ENV_BRANCH === 'master'
    ? 'https://lit.indicium.hu/api/v1'
    : 'https://lit.dev.indicium.hu/api/v1'

const apiInstance = axios.create({ baseURL })

Vue.prototype.$api = apiInstance
