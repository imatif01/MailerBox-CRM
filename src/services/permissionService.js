import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const permissionService = {
  _url: `${process.env.REACT_APP_PERMISSION_URL}`,

  GetPermissions(searchQuery, refetch) {
    const [permissions, setPermissions] = useState({
      totalItems: 0,
      permissions: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getPermissions(searchQuery))
        .then(res => {
          setPermissions(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      permissions_loading: status === STATUS.LOADING,
      permissions_error: status === STATUS.ERROR ? status : '',
      permissions_data: permissions,
    };
  },

  async getPermissions({
    page = 1,
    pageSize = 10,
    searchText = '',
    startDate = '',
    endDate = '',
    getAll = false,
    parentOnly = false,
    filterPermission = '',
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-permissions?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&filterText=${filterPermission}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}&parentOnly=${parentOnly}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        permissions: res?.data?.items,
        totalItems: res?.data?.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createPermission(payload) {
    let res = await Fetch.post(`${this._url}/create-permission`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updatePermission(id, payload) {
    let res = await Fetch.put(`${this._url}/update-permission/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deletePermission(id) {
    let res = await Fetch.delete(`${this._url}/delete-permission/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  /**
   *
   * @param {Dynamic calling} param0
   * @returns
   */
  async getPermissionsOptions({ parentOnly = false }) {
    let res = await Fetch.get(`${this._url}/get-all-permissions?parentOnly=${parentOnly}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        permissionStatus: res?.data?.items.map(({ can }) => ({
          label: can.split('.')[0],
          value: can.split('.')[0],
        })),
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default permissionService;
