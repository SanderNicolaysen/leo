import Api from '@/services/Api';

export default {
  async find (name) {
    try {
      const response = await Api().get('/forms/' + name);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  },

  async put (form) {
    try {
      await Api().put('/forms/' + form.normalizedName, form);
    } catch (error) {
      console.error(error);
    }
  },

  async list () {
    try {
      const response = await Api().get('/forms/list');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
