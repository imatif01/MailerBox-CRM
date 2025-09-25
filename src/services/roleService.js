import { Fetch } from '../helpers/fetchWrapper';
import { useEffect, useState } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const roleService = {
  _url: `${process.env.REACT_APP_ROLE_URL}`,

  GetRoles(searchQuery, refetch) {
    const [roles, setRoles] = useState({
      totalItems: 0,
      roles: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getRoles(searchQuery))
        .then(res => {
          setRoles(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [JSON.stringify(searchQuery), refetch]);
    return {
      roles_loading: status === STATUS.LOADING,
      roles_error: status === STATUS.ERROR ? status : '',
      roles_data: roles,
    };
  },

  async getRoles({
    page = 1,
    pageSize = 10,
    searchText = '',
    filterRoles = '',
    startDate = '',
    endDate = '',
    getAll = false,
  }) {
    let res = await Fetch.get(
      `${this._url}/role?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&filterRoles=${filterRoles}&startDate=${startDate}&endDate=${endDate}&getAll=${getAll}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return {
        roles: res.items,
        totalItems: res.totalItems,
      };
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async deleteRole(id) {
    let res = await Fetch.delete(`${this._url}/delete-role/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async createRole(payload) {
    let res = await Fetch.post(`${this._url}/create-role`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async updateRole(id, payload) {
    let res = await Fetch.put(`${this._url}/update-role/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async rolesFiltersOptions(params) {
    let res = await Fetch.get(
      `${this._url}/get-all-roles?getAll=${params?.getAll}&getAssignees=${params.getAssignees}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      if (params?.getAll) {
        return {
          options: res.items.map(({ type }) => ({ label: type, value: type })),
        };
      } else {
        return {
          options: res.items.map(({ type, _id }) => ({ label: type, value: type })),
        };
      }
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default roleService;
