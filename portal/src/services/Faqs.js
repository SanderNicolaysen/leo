import Api from '@/services/Api';

export default {
  // Get one faq
  async getFaq (body) {
    try {
      const response = await Api().get(`/faqs/${body.subject}/${body._id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  // Get all faqs from specific subject
  async getFaqs (subject) {
    try {
      const response = await Api().get(`/faqs/${subject}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  // Get all the faqs
  async getAllFaqs () {
    try {
      const response = await Api().get(`/faqs`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async postFaq (body) {
    try {
      const response = await Api().post('/faqs', body);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteFaq (body) {
    try {
      const response = await Api().delete(`/faqs/${body.subject}/${body._id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async updateFaq (body) {
    try {
      const response = await Api().patch(`/faqs/${body.subject}/${body._id}`, body);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async updateFaqs (body) {
    try {
      const response = await Api().put(`/faqs/${body[0].subject}`, body);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
