import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const authorService = {
  _url: `${process.env.REACT_APP_BLOG_URL}/author`,

  GetAuthors(searchQuery, refetch) {
    const [authors, setAuthors] = useState({
      totalItems: 0,
      authors: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getAuthors(searchQuery))
        .then(res => {
          setAuthors(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      author_loading: status === STATUS.LOADING,
      author_error: status === STATUS.ERROR ? status : '',
      authors_data: authors,
    };
  },

  async getAuthors({ page = 1, itemsPerPage = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-authors?page=${page}&itemsPerPage=${itemsPerPage}&getAll=${getAll}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        authors: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createAuthor(payload) {
    let res = await Fetch.upload(`${this._url}/create-author`, 'POST', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateAuthor(id, payload) {
    let res = await Fetch.upload(`${this._url}/update-author/${id}`, 'PUT', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteAuthor(id, payload) {
    let res = await Fetch.delete(`${this._url}/delete-author/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default authorService;
