import Api from '@/services/Api'

export default {
  getFaqs () {
    return Api().get('/api/faqs')
  }
}
