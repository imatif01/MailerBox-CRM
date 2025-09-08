import { Fetch } from '../helpers/fetchWrapper';

const authService = {
  _url: `${process.env.REACT_APP_AUTH_URL}`,

  async login({ email = '', password = '' }) {
    let res = await Fetch.post(`${this._url}/admin-login`, {
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
    let res = await Fetch.get(`${this._url}/get-admin-details`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async removeUserJwt() {
    let res = await Fetch.delete(`${this._url}/logout-admin`, {}, true);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default authService;
