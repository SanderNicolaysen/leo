import axios from 'axios';

const server = axios.create({});

export default {
  /**
   * Attempts to log in with the supplied username and password
   * @param {String} username
   * @param {String} password
   * @returns {Boolean}
   */
  async login (username, password) {
    try {
      await server.post('/login', { username: username, password: password });
      return true;
    } catch (error) {
      console.info(error);
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

  /**
   * The logged in user, if any
   * @returns {Object|null}
   */
  async user () {
    try {
      const res = await server.get('/user');
      return res.data;
    } catch (error) {
      return null;
    }
  }
};
