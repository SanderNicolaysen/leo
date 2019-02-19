import Api from '@/services/Api'

export default {
  async getInquiries () {
    try {
      const response = await Api().get('/api/inquiries')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
