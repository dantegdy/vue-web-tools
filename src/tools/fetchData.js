
let baseUrl = 'http://192.168.31.172:10393/mock/303a6abd-0eac-458f-9599-af1639d021d8'
export function fetchData(url, method = 'GET', data = null, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      url=baseUrl+url;
      xhr.open(method, url, true);
   
      // 设置请求头
      Object.keys(options.headers || {}).forEach((key) => {
        xhr.setRequestHeader(key, options.headers[key]);
      });
   
      // 设置请求参数
      if (data) {
        if (method === 'GET') {
          url += `?${encodeURIComponent(JSON.stringify(data))}`;
        } else if (method === 'POST') {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        } else {
          throw new Error(`Unsupported method: ${method}`);
        }
      } else {
        xhr.send();
      }
   
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      };
    });
   }