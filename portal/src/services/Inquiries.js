import Api from '@/services/Api'

export default {
  async getInquiries () {
    try {
      const response = await Api().get('/inquiries')
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async startInquiry () {
    try {
      const response = await Api().post('/inquiries')
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async update (id, data) {
    try {
      const response = await Api().patch('/inquiries/' + id, data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
