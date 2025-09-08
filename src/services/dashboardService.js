import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const dashboardService = {
  _url: `${process.env.REACT_APP_DASHBOARD_URL}`,

  GetRecentCustomers() {
    const [customers, setCustomers] = useState({
      totalItems: 0,
      customers: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getRecentCustomers())
        .then(res => {
          setCustomers(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, []);
    return {
      customers_loading: status === STATUS.LOADING,
      customers_error: status === STATUS.ERROR ? status : '',
      customers_data: customers,
    };
  },

  async getRecentCustomers() {
    let res = await Fetch.get(`${this._url}/get-recent-customers`);
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

  async getAnalyticCards() {
    let res = await Fetch.get(`${this._url}/get-card-analytics`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res?.data;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default dashboardService;
