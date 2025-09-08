import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const enquiryService = {
  _url: `${process.env.REACT_APP_ENQUIRY_URL}`,

  GetEnquiries(searchQuery, refetch) {
    const [enquiries, setEnquiries] = useState({
      totalItems: 0,
      enquiries: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getEnquiries(searchQuery))
        .then(res => {
          setEnquiries(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      enquiries_loading: status === STATUS.LOADING,
      enquiries_error: status === STATUS.ERROR ? status : '',
      enquiries_data: enquiries,
    };
  },

  async getEnquiries({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/all?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        enquiries: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteEnquiry(id) {
    let res = await Fetch.delete(`${this._url}/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default enquiryService;
