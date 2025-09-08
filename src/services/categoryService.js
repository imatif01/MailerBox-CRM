import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const categoryService = {
  _url: `${process.env.REACT_APP_CATEGORY_URL}`,

  GetCategories(searchQuery, refetch) {
    const [categories, setCategories] = useState({
      totalItems: 0,
      categories: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getCategories(searchQuery))
        .then(res => {
          setCategories(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      categories_loading: status === STATUS.LOADING,
      categories_error: status === STATUS.ERROR ? status : '',
      categories_data: categories,
    };
  },

  async getCategories({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-categories?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        categories: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default categoryService;
