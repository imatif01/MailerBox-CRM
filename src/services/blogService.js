import { useState, useEffect } from 'react';
import { Fetch } from '../helpers/fetchWrapper';
import { useCancellablePromise } from 'helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const blogService = {
  _url: `${process.env.REACT_APP_BLOG_URL}`,

  GetBlogs(searchQuery, refetch) {
    const [blogs, setBlogs] = useState({
      totalItems: 0,
      blogs: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getBlogs(searchQuery))
        .then(res => {
          setBlogs(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      blogs_loading: status === STATUS.LOADING,
      blogs_error: status === STATUS.ERROR ? status : '',
      blogs_data: blogs,
    };
  },

  async getBlogs({ page, itemsPerPage, searchText, filterCategory, startDate, endDate, getAll = false }) {
    let res =
      await Fetch.get(`${this._url}/all?page=${page}&itemsPerPage=${itemsPerPage}&searchText=${searchText}&filterCategory=${filterCategory}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}
    `);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        blogs: res?.items,
        totalItems: res?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createBlog(values) {
    let res = await Fetch.upload(`${this._url}/create`, 'POST', values);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateBlog(id, payload) {
    let res = await Fetch.upload(`${this._url}/single/${id}`, 'PUT', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateLanguage(id, payload) {
    let res = await Fetch.put(`${this._url}/update-language/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteLanguage(id, language) {
    let res = await Fetch.delete(`${this._url}/delete-language/${id}/${language}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async addBlogInNewLanguage(id, values) {
    let res = await Fetch.post(`${this._url}/add-new-language/${id}`, values);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteBlog(id) {
    let res = await Fetch.delete(`${this._url}/single/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async categoryFiltersOptions({ getAll = true }) {
    let res = await Fetch.get(`${this._url}/allCategories?getAll=${getAll}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        options: res.items.map(({ categoryTitle, _id }) => ({
          label: categoryTitle,
          value: _id,
        })),
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default blogService;
