import Api from '@/services/Api'

export default {
  async getFaqs (subject) {
    try {
<<<<<<< HEAD
      const response = await Api().get('/faqs')
=======
      const response = await Api().get(`/api/faqs/${subject}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  async getFaq (body) {
    try {
      const response = await Api().get(`/api/faqs/${body.subject}/${body.id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  async postFaq (body) {
    try {
      const response = await Api().post('/api/faqs', body)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  async deleteFaq (body) {
    try {
      const response = await Api().delete(`/api/faqs/${body.subject}/${body.id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  async updateFaq (body) {
    try {
      const response = await Api().patch(`/api/faqs/${body.subject}/${body.id}`, body)
>>>>>>> can now get, update, delete and post new faq or statement to a specific subject
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
