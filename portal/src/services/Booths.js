import Api from '@/services/Api';

export default {

  async getBooth () {
    try {
      const response = await Api().get('/booths');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async update (boothNum) {
    try {
      const response = await Api().patch('/booths/' + boothNum + '/update');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
