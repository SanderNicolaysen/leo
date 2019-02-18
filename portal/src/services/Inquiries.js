import Api from '@/services/Api'

export default {
  getInquiries () {
    return Api().get('/api/inquiries')
  }
}
