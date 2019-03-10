import Api from '@/services/Api';

export default {
  async stats () {
    try {
      const response = await Api().get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
