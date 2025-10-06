import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const productService = {
  _url: `${process.env.REACT_APP_PRODUCT_URL}`,

  GetAllProducts(searchQuery, refetch) {
    const [products, setProducts] = useState({
      totalItems: 0,
      products: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getAllProducts(searchQuery))
        .then(res => {
          setProducts(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      products_loading: status === STATUS.LOADING,
      products_error: status === STATUS.ERROR ? status : '',
      products_data: products,
    };
  },

  async getAllProducts({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/all?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        products: res?.items,
        totalItems: res?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createProduct(payload) {
    let res = await Fetch.post(`${this._url}/create`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateProduct(payload) {
    let res = await Fetch.put(`${this._url}/edit`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteProduct(id, payload) {
    let res = await Fetch.delete(`${this._url}/delete/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async productFiltersOptions({ getAll = true }) {
    let res = await Fetch.get(`${this._url}/all?getAll=${getAll}`);
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

export default productService;
