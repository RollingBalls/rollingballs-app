require("whatwg-fetch");

// If you have any issue ask Steffoz
class AbstractApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(url, params, options = {}) {
    options = Object.assign(
      {},
      options,
      { method: 'get' }
    );
    if (params) {
      url = url + '?' + this.objectToQueryString(params);
    }
    return this.request(url, options);
  }

  post(url, body, options = {}) {
    options = Object.assign(
      {},
      options,
      { method: 'post', body: JSON.stringify(body) }
    );
    return this.request(url, options);
  }

  put(url, body, options = {}) {
    options = Object.assign(
      {},
      options,
      { method: 'put', body: JSON.stringify(body) }
    );
    return this.request(url, options);
  }

  delete(url, options = {}) {
    options = Object.assign(
      {},
      options,
      { method: 'delete' }
    );
    return this.request(url, options);
  }

  apiUrl(path = '') {
    return this.baseURL + path;
  }

  defaultHeaders() {
    return {
      "Content-Type": 'application/json'
    };
  }

  request(url, options = {}) {
    url = this.apiUrl(url);

    options.headers = Object.assign({}, this.defaultHeaders(), options.headers);
    return fetch(url, options)
      .then((response) => {
        if (response.status !== 204) {
          return response.json()
          .then(function(body) {
            response.body = body;
            return response;
          });
        } else {
          response.body = true;
          return response;
        }
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      });
  }

  objectToQueryString(obj) {
    return Object.keys(obj).map(k => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
  }
};

export default AbstractApi;
