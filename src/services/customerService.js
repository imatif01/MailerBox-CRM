import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const customerService = {
  _url: `${process.env.REACT_APP_CUSTOMER_URL}`,

  GetCustomers(searchQuery, refetch) {
    const [customers, setCustomers] = useState({
      totalItems: 0,
      customers: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getCustomers(searchQuery))
        .then(res => {
          setCustomers(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      customers_loading: status === STATUS.LOADING,
      customers_error: status === STATUS.ERROR ? status : '',
      customers_data: customers,
    };
  },

  GetCustomerCreditHistory(id, searchQuery, refetch) {
    const [creditHistory, setCreditHistory] = useState({
      totalItems: 0,
      creditHistory: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getCustomerCreditHistory(id, searchQuery))
        .then(res => {
          setCreditHistory(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [id, JSON.stringify(searchQuery), refetch]);
    return {
      credit_history_loading: status === STATUS.LOADING,
      credit_history_error: status === STATUS.ERROR ? status : '',
      credit_history_data: creditHistory,
    };
  },

  async getCustomerCreditHistory(id, { page = 1, pageSize = 10, getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-user-credit-history/${id}?page=${page}&itemsPerPage=${pageSize}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        creditHistory: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async getCustomers({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-users?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        customers: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateCustomer(payload) {
    let res = await Fetch.patch(`${this._url}/update-user-credit-history`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteCustomer(id) {
    let res = await Fetch.delete(`${this._url}/customer/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default customerService;
