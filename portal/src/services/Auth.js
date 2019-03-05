import axios from 'axios';

const server = axios.create({});

export default {
  /**
   *
   * @param {String} username
   * @param {String} password
   * @returns {Boolean} returns true on success, false on failure
   */
  async login (username, password) {
    try {
      const res = await server.post('/login', { username: username, password: password });

      if (res !== 200) {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  /**
   * Logs out the currently logged in user.
   */
  async logout () {
    try {
      await server.get('/logout');
    } catch (error) {
      console.error(error);
    }
  },

  async user () {
    try {
      const res = await server.get('/user');
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
};
