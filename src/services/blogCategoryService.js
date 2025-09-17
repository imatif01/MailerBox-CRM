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
      category_loading: status === STATUS.LOADING,
      category_error: status === STATUS.ERROR ? status : '',
      category_data: categories,
    };
  },

  async getCategories({ page = 1, itemsPerPage = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-categories?page=${page}&itemsPerPage=${itemsPerPage}&getAll=${getAll}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        categories: res?.items,
        totalItems: res?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createCategory(payload) {
    let res = await Fetch.post(`${this._url}/create`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateCategory(id, payload) {
    let res = await Fetch.put(`${this._url}/update/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteCategory(id, payload) {
    let res = await Fetch.delete(`${this._url}/delete/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async categoryFiltersOptions({ getAll = true }) {
    let res = await Fetch.get(`${this._url}/get-all-categories?getAll=${getAll}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        options: res?.data?.items.map(({ categoryTitle, id }) => ({
          label: categoryTitle,
          value: id,
        })),
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default categoryService;
