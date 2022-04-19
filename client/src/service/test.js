import httpClient from './http_client'

class Test {
  constructor() {
    this.test = httpClient
  }

  getlist = async () => {
    try {
      const response = await this.test.get('list')
      console.log('inin')
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
