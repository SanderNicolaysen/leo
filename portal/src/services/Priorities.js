import Api from '@/services/Api';

export default {
  async getAll () {
    try {
      const response = await Api().get('/priorities');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async update (category, priority) {
    try {
      const response = await Api().patch('/priorities/' + encodeURIComponent(category), { priority: priority });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
