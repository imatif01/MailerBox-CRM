/* eslint-disable no-unreachable */
import React, { useState, createContext, useEffect } from 'react';
import { clearCookie, getCookie, setCookie } from 'helpers/common';
import Toast from 'components/molecules/Toast';
import authService from 'services/authService';
import { useCancellablePromise } from 'helpers/promiseHandler';

const context = {};

export const AuthContext = createContext(context);

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie(process.env.REACT_APP_CRM_TOKEN_COOKIE));
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [loading_user, setLoadingUser] = useState(false);
  const { cancellablePromise } = useCancellablePromise();
  const [reFetch, setRefetch] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [allowedPages, setAllowedPages] = useState(
    JSON.parse(getCookie(process.env.REACT_APP_ALLOWED_PAGES_COOKIE)) || [],
  );
  const [active, setActive] = useState(false);


  const onLogout = async () => {
    try {
      if (isLoggedIn) {
        setLoadingUser(true);
        await authService.removeUserJwt();
        Toast({ type: 'success', message: 'Logout Successfully' });
        clearCookie(process.env.REACT_APP_CRM_TOKEN_COOKIE);
        clearCookie(process.env.REACT_APP_ALLOWED_PAGES_COOKIE);
      }
      setLoadingUser(false);
      setIsLoggedIn(false);
    } catch (ex) {
      // Toast({ type: 'error', message: `${ex.message}` });
    }
  };

  const getPermissions = () => {
    setLoadingUser(true);
    cancellablePromise(authService.getCurrentUser())
      .then(res => {
              const permissions = res?.permissions || [];

             const navPages = permissions
        .filter(p => p.includes('.nav'))
        .map(p => `/${p.replace('.nav', '')}`);
        setAllowedPages(navPages);
        setCookie(
          process.env.REACT_APP_ALLOWED_PAGES_COOKIE,
          JSON.stringify(navPages),
        );
        setLoadingUser(false);
        setUser(res);
      })
      .catch(err => {
        setAllowedPages(['no-permissions']);
        setCookie(process.env.REACT_APP_ALLOWED_PAGES_COOKIE, JSON.stringify(['no-permissions']));
        setLoadingUser(false);
        Toast({
          type: 'error',
          message: err.message,
        });
      });
  };

  // const getPermissions = () => {
  //   setLoadingUser(true);

  //   const defaultPermissions = ['dashboard', 'post', 'category', 'author', 'admin', 'permission'];

  //   setAllowedPages(defaultPermissions);
  //   setCookie(process.env.REACT_APP_ALLOWED_PAGES_COOKIE, JSON.stringify(defaultPermissions.map(p => `/${p}`)));

  //   setLoadingUser(false);

  //   setUser({
  //     id: 'default-user',
  //     name: 'Guest User',
  //     email: 'guest@example.com', // 👈 add this
  //     permissions: defaultPermissions.map(p => `${p}.nav`),
  //   });
  // };

  /**
   * @description - This function is used to fetch the user details from the server
   */
  useEffect(() => {
    if (isLoggedIn) {
      getPermissions();
    }
  }, [isLoggedIn]);

  const onLogin = async ({ email, password }) => {
    setLoadingUser(true);
    try {
      const res = await authService.login({
        email,
        password,
      });

      if (!res?.token) {
        throw new Error(res?.message);
      }
      setLoadingUser(false);
      setCookie(process.env.REACT_APP_CRM_TOKEN_COOKIE, res?.token);
      setIsLoggedIn(true);
    } catch ({ message }) {
      setIsLoggedIn(false);
      setLoadingUser(false);
      Toast({ type: 'error', message });
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    function listenCookieChange(callback, interval) {
      let old_bap_token = getCookie(process.env.REACT_APP_CRM_TOKEN_COOKIE);
      let old_allowed = getCookie(process.env.REACT_APP_ALLOWED_PAGES_COOKIE);
      setInterval(() => {
        const new_bap_token = getCookie(process.env.REACT_APP_CRM_TOKEN_COOKIE);
        const new_allowed = getCookie(process.env.REACT_APP_ALLOWED_PAGES_COOKIE);
        if (new_bap_token !== old_bap_token) {
          try {
            callback(new_bap_token, process.env.REACT_APP_CRM_TOKEN_COOKIE);
          } finally {
            old_bap_token = new_bap_token;
          }
        }
        if (new_allowed !== old_allowed) {
          try {
            callback(new_allowed, process.env.REACT_APP_ALLOWED_PAGES_COOKIE);
          } finally {
            old_allowed = new_allowed;
          }
        }
      }, interval);
    }
    const intervalId = listenCookieChange((value, cookie) => {
      if (cookie === process.env.REACT_APP_CRM_TOKEN_COOKIE) {
        if (!value) {
          onLogout();
        }
      }
      if (cookie === process.env.REACT_APP_ALLOWED_PAGES_COOKIE) {
        if (JSON.stringify(allowedPages) !== value && isLoggedIn) {
          getPermissions();
        }
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hasPermission = perm => user?.permissions?.includes(perm);
  return (
    <AuthContext.Provider
      value={{
        setIsLoggedIn,
        onLogout,
        onLogin,
        refetch: () => setRefetch(_ => !_),
        setShowTokenModal,
        setLoading,
        hasPermission,
        allowedPages,
        showTokenModal,
        loading,
        isLoggedIn,
        fetch: reFetch,
        user,
        loading_user,
        active,
        setActive,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
