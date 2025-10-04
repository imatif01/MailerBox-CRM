import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const productCategoryService = {
  _url: `${process.env.REACT_APP_PRODUCT_URL}`,

  GetProductCategories(searchQuery, refetch) {
    const [categories, setCategories] = useState({
      totalItems: 0,
      categories: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getProductCategories(searchQuery))
        .then(res => {
          setCategories(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      product_categories_loading: status === STATUS.LOADING,
      product_categories_error: status === STATUS.ERROR ? status : '',
      product_categories_data: categories,
    };
  },

  async getProductCategories({
    page = 1,
    pageSize = 10,
    searchText = '',
    startDate = '',
    endDate = '',
    getAll = false,
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-product-categories?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
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
    let res = await Fetch.post(`${this._url}/create-product-category`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateCategory(payload) {
    let res = await Fetch.put(`${this._url}/edit-product-category`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteCategory(id, payload) {
    let res = await Fetch.delete(`${this._url}/delete-product-category/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async productCategoryFiltersOptions({ getAll = true }) {
    let res = await Fetch.get(`${this._url}/get-all-product-categories?getAll=${getAll}`);
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
export default productCategoryService;
