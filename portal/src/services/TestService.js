import Api from '@/services/Api'

export default {
  async test () {
    try {
      const response = await Api().get('/api/test')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
