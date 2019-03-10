import Api from '@/services/Api';

export default {
  async getAppointments () {
    try {
      const response = await Api().get('/appointments');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async postAppointment (data) {
    try {
      const response = await Api().post('/appointments', data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async update (id, data) {
    try {
      const response = await Api().patch('/appointments/' + id, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async delete (id) {
    try {
      const response = await Api().delete('/appointments/' + id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
