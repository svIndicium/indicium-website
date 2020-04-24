export default class DataMiddleware {
  onResponse(response) {
    const res = JSON.parse(response.data)
    return Promise.resolve({
      data: res.data,
      error: res.error,
      status: res.status,
    })
  }
}
