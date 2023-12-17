let baseUrl = "http://127.0.0.1:3000/";
import { ElMessage } from "element-plus";
import { toolkits } from "@/tools/toolkits";

interface Options extends RequestInit {
  params?: { [propName: string]: any };
}

export function fetchData(
  url: string,
  // data: any = null,
  options: Options = {}
): Promise<any> {
  return new Promise((resolve, reject) => {
    let urlWithParams = `${baseUrl}${url}`;

    // if (data) {
    //   urlWithParams += `?${encodeURIComponent(JSON.stringify(data))}`;
    // }
    const { method, params } = options;
    const fetchOptions = {
      ...options,
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...options.headers,
      },
    };

    if (fetchOptions.method === "POST") {
      fetchOptions.body = JSON.stringify(params);
    } else {
      urlWithParams += `?${toolkits.stringify(params)}`;
      // fetchOptions.params = params;
    }
    console.log(urlWithParams, fetchOptions.body);

    fetch(urlWithParams, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          console.error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.code !== 0) {
          ElMessage.error(
            data.msg || data.message.isArrery() ? data.message[0] : data.message
          );
          return;
        }
        data.msg && ElMessage.success(data.msg);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}
