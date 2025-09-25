import { Fetch } from '../helpers/fetchWrapper';

const authService = {
  _url: `${process.env.REACT_APP_ADMIN_URL}`,

  async login({ email = '', password = '' }) {
    let res = await Fetch.post(`${this._url}/signin`, {
      email,
      password,
    });
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async getCurrentUser() {
    let res = await Fetch.get(`${this._url}/perms`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async removeUserJwt() {
    let res = await Fetch.delete(`${this._url}/logout`, {}, true);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default authService;
