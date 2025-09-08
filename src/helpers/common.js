export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = this.getDateObject(new Date());
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
  document.cookie = `${name}=${value || ''}; path=/;`;

  return true;
};

export const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (const element of ca) {
    let c = element;
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const clearCookie = name => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  document.cookie = `${name}=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  return true;
};

export const getCurrencySymbol = currency => {
  switch (currency?.toUpperCase()) {
    case 'USD':
      return '$';
    case 'AED':
      return 'AED';
    case 'EURO':
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    default:
      return ''; // Default case for unsupported currencies
  }
};

export const convertToCurrencyFormat = (currency, amount = '0') => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${Number(amount)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const convertToFormData = data => {
  const formData = new FormData();

  const appendData = (obj, parentKey = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${fullKey}[${index}]`, item);
          } else if (typeof item === 'object' && item !== null) {
            appendData(item, `${fullKey}[${index}]`);
          } else {
            formData.append(`${fullKey}[${index}]`, item);
          }
        });
      } else if (value instanceof File) {
        formData.append(fullKey, value);
      } else if (typeof value === 'object' && value !== null) {
        appendData(value, fullKey);
      } else {
        formData.append(fullKey, value);
      }
    });
  };

  appendData(data);

  return formData;
};

export const removeSpecialFields = obj => {
  const keysToRemove = Object.keys(obj).filter(key => RegExp(/cancellationPolicy\d|rule\d/).exec(key));
  const filteredObj = {};
  Object.keys(obj).forEach(key => {
    if (!keysToRemove.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

export const validateArrayElemForEachOther = (e, arr) => {
  for (const element of arr) {
    if (element === e) {
      return true;
    }
  }
  return false;
};

export const formatCurrency = (amount, currency = { label: 'GBP (£)', value: '£' }) => {
  return `${currency?.value === '&#163;' ? '£' : currency?.value} ${amount?.toLocaleString() || '0.00'}`;
};
