import Api from '@/services/Api';

export default {

  async nextInquiry () {
    try {
      const response = await Api().get('/inquiries/next');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getInquiries () {
    try {
      const response = await Api().get('/inquiries');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async startInquiry (_type) {
    try {
      const response = await Api().post('/inquiries', { type: _type });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async update (id, data) {
    try {
      const response = await Api().patch('/inquiries/' + id + '/update', data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async delete (id, key) {
    try {
      const response = await Api().delete('/inquiries/' + id, { data: { key: key } });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async setForms (id, key, forms) {
    try {
      const response = await Api().patch('/inquiries/' + id + '/forms', { key: key, forms: forms });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
