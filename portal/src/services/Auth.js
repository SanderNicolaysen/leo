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
  },

  /**
   * Get all users in the system
   */
  async getUsers () {
    try {
      const res = await server.get('/users');
      return res.data;
    } catch (error) {
      return null;
    }
  },

  /**
   * Register new user
   * @param {String} username
   * @param {String} password
   * @returns {Boolean}
   */
  async register (user) {
    try {
      const res = await server.post('/register', { name: user.name, username: user.username, password: user.password });
      return res.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  /**
   * Delete user
   */
  async delete (id) {
    try {
      await server.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  /**
   * update user
   */
  async update (id, data) {
    try {
      const res = await server.patch(`/user/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
};
