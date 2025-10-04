import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const productIndustryService = {
  _url: `${process.env.REACT_APP_PRODUCT_URL}`,

  GetProductIndustries(searchQuery, refetch) {
    const [industries, setIndustries] = useState({
      totalItems: 0,
      industries: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getProductIndustries(searchQuery))
        .then(res => {
          setIndustries(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      product_industries_loading: status === STATUS.LOADING,
      product_industries_error: status === STATUS.ERROR ? status : '',
      product_industries_data: industries,
    };
  },

  async getProductIndustries({
    page = 1,
    pageSize = 10,
    searchText = '',
    startDate = '',
    endDate = '',
    getAll = false,
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-product-industries?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        industries: res?.items,
        totalItems: res?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createIndustry(payload) {
    let res = await Fetch.post(`${this._url}/create-product-industry`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateIndustry(payload) {
    let res = await Fetch.put(`${this._url}/edit-product-industry`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteIndustry(id, payload) {
    let res = await Fetch.delete(`${this._url}/delete-product-industry/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async industryFiltersOptions({ getAll = true }) {
    let res = await Fetch.get(`${this._url}/get-all-product-industries?getAll=${getAll}`);
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

export default productIndustryService;
