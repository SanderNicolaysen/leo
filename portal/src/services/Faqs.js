import Api from '@/services/Api'

export default {
  async getFaqs () {
    try {
      const response = await Api().get('/api/faqs')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
