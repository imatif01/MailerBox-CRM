import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const adminService = {
  _url: `${process.env.REACT_APP_ADMIN_URL}`,

  GetAdmins(searchQuery, refetch) {
    const [admins, setAdmins] = useState({
      admins: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getAdmins(searchQuery))
        .then(res => {
          setAdmins(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      admin_loading: status === STATUS.LOADING,
      admin_error: status === STATUS.ERROR ? status : '',
      admin_data: admins,
    };
  },

  async getAdmins({ page = 1, pageSize = 10, searchText, filterRoles, startDate, endDate, getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-admins?itemsPerPage=${pageSize}&page=${page}&searchText=${searchText}&filterRoles=${filterRoles}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        admins: res.items,
        totalItems: res.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async addAdmin(values) {
    let res = await Fetch.post(`${this._url}/add-admin`, values);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteAdmin(id) {
    let res = await Fetch.delete(`${this._url}/delete-admin/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateAdmin(id, values) {
    let res = await Fetch.patch(`${this._url}/update-admin/${id}`, values);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  GetSubscribers(searchQuery, refetch) {
    const [subscribers, setSubscribers] = useState({
      totalItems: 0,
      subscribers: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getSubscribers(searchQuery))
        .then(res => {
          setSubscribers(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      subscribers_loading: status === STATUS.LOADING,
      subscribers_error: status === STATUS.ERROR ? status : '',
      subscribers_data: subscribers,
    };
  },

  async getSubscribers({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/subscribers?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        subscribers: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  GetGeneralEnquiries(searchQuery, refetch) {
    const [generalEnquiries, setGeneralEnquiries] = useState({
      totalItems: 0,
      generalEnquiries: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getGeneralEnquirues(searchQuery))
        .then(res => {
          setGeneralEnquiries(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      general_enquiries_loading: status === STATUS.LOADING,
      general_enquiries_error: status === STATUS.ERROR ? status : '',
      general_enquiries_data: generalEnquiries,
    };
  },

  async getGeneralEnquirues({
    page = 1,
    pageSize = 10,
    searchText = '',
    startDate = '',
    endDate = '',
    getAll = false,
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-general-enquiries?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        generalEnquiries: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteGeneralEnquiry(id) {
    let res = await Fetch.delete(`${this._url}/delete-general-enquiry/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default adminService;
