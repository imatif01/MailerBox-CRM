import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const testimonialService = {
  _url: `${process.env.REACT_APP_TESTIMONIAL_URL}`,

  GetTestimonials(searchQuery, refetch) {
    const [testimonials, setTestimonials] = useState({
      totalItems: 0,
      testimonials: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getTestimonials(searchQuery))
        .then(res => {
          setTestimonials(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      testimonials_loading: status === STATUS.LOADING,
      testimonials_error: status === STATUS.ERROR ? status : '',
      testimonials_data: testimonials,
    };
  },

  async getTestimonials({ page = 1, pageSize = 10, searchText = '', startDate = '', endDate = '', getAll = false }) {
    let res = await Fetch.get(
      `${this._url}/get-all-testimonials?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        testimonials: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createTestimonial(payload) {
    let res = await Fetch.upload(`${this._url}/create-testimonial`, 'POST', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateTestimonial(id, payload) {
    let res = await Fetch.upload(`${this._url}/update-testimonial/${id}`, 'PUT', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteTestimonial(id) {
    let res = await Fetch.delete(`${this._url}/delete-testimonial/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default testimonialService;
