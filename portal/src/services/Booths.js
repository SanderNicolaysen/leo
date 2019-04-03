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

  async update (boothNum, confirmedOverwrite) {
    try {
      const response = await Api().patch('/booths/' + boothNum + '/update', { confirmedOverwrite });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
