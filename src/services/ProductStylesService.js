import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const productStyleService = {
  _url: `${process.env.REACT_APP_PRODUCT_URL}`,

  GetProductStyles(searchQuery, refetch) {
    const [styles, setStyles] = useState({
      totalItems: 0,
      styles: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getProductStyles(searchQuery))
        .then(res => {
          setStyles(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      product_styles_loading: status === STATUS.LOADING,
      product_styles_error: status === STATUS.ERROR ? status : '',
      product_styles_data: styles,
    };
  },

  async getProductStyles({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-product-styles?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        styles: res?.items,
        totalItems: res?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createStyle(payload) {
    let res = await Fetch.post(`${this._url}/create-product-style`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateStyle(payload) {
    let res = await Fetch.put(`${this._url}/edit-product-style`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteStyle(id, payload) {
    let res = await Fetch.delete(`${this._url}/delete-product-style/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async stylesFiltersOptions({ getAll = true }) {
    let res = await Fetch.get(`${this._url}/get-all-product-styles?getAll=${getAll}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        options: res?.items.map(({ categoryTitle, id }) => ({
          label: categoryTitle,
          value: id,
        })),
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};

export default productStyleService;
