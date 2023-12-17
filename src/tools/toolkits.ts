interface ObjInterface {
  [propName: string]: any;
}
export const toolkits: ObjInterface = {
  /**
   *
   * @method
   * @param {ObjInterface} [obj] 要使用url传递的参数对象
   * @return {String}
   */
  stringify(obj: ObjInterface) {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      if (obj[key]) {
        result.push(`${key}=${encodeURIComponent(obj[key])}`);
      }
    }
    return result.join("&");
  },
  json(str: string) {
    const pairs = str.split("&");
    const json: ObjInterface = {};
    pairs.forEach((pair) => {
      const splits = pair.replace("=", "&").split("&");
      if (splits[0]) {
        json[splits[0]] = splits[1] && decodeURIComponent(splits[1]);
      }
    });
    return json;
  },
  getLocationParams() {
    const splits = location.href.match(/\?([^#]+)/);
    if (splits?.[1]) {
      return toolkits.json(splits[1]);
    }
    return {};
  },
  /**
   * 从当前url种获取key为variable的值
   * @method grtParams
   * @param {String} variable
   * @returns [Stirng]
   */
  getParams(variable: String): String {
    const splits = location.href.match(/\?([^#]+)/);
    if (splits?.[1]) {
      const query = splits[1];
      const vars = query.split("&");
      for (const i of vars) {
        const pair = i.split("=");
        if (pair[0] === variable) {
          return pair[1];
        }
      }
    }
    return "";
  },
  getCookie(name: string) {
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) {
      return unescape(String(arr[2]));
    }
    return "";
  },
  isIphoneXSeries(): boolean {
    // 判断是不是X类型手机
    /** X XS, XS Max, XR, 11, 11pro,11pro max, 12mini, 12,  12 pro, 12 pro max */
    const xSeriesConfig = [
      {
        devicePixelRatio: 3,
        width: 375,
        height: 812,
      },
      {
        devicePixelRatio: 3,
        width: 414,
        height: 896,
      },
      {
        devicePixelRatio: 2,
        width: 414,
        height: 896,
      },
      {
        devicePixelRatio: 3,
        width: 315,
        height: 812,
      },
      {
        devicePixelRatio: 3,
        width: 390,
        height: 844,
      },
      {
        devicePixelRatio: 3,
        width: 428,
        height: 926,
      },
    ];
    // h5
    const isIOS = /iphone/gi.test(window.navigator.userAgent);
    if (!isIOS) return false;
    const { devicePixelRatio, screen } = window;
    const { width, height } = screen;
    return xSeriesConfig.some(
      (item) =>
        item.devicePixelRatio === devicePixelRatio &&
        item.width === width &&
        item.height === height
    );
  },
  /**
   * 将以分为单位的数值转换为以元为单位的数值
   * @method   transformMoney
   * @param    {string|int|undefined}  money 以分为单位的金额
   * @param    {boolean} format 金额是否隔三位数添加一个逗号 eg:100,000.00
   * @returns  string
   *
   */
  transformMoney(money: number | string | undefined, format?: boolean): string {
    if (Number(money)) {
      if (!format) {
        const moneyFomat = Number(money);
        return (moneyFomat / 100).toFixed(2);
      }
      const s = `${parseFloat(`${Number(money) / 100}`).toFixed(2)}`;
      const l = s.split(".")[0].split("").reverse();
      const r = s.split(".")[1];
      let t = "";
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
      }
      return `${t.split("").reverse().join("")}.${r}`;
    }
    return "0.00";
  },
  /**
   * 格式化日期为指定的格式
   *
   * @method date2Str
   * @param {Date} date
   * @param {String} p 输出格式, %Y/%M/%d/%h/%m/% s的组合
   * @param {Boolean} [isFill:false] 不足两位是否补0
   * @return {String|Boolean}
   */
  date2Str(timestamp: string | number, p?: string, isFill?: boolean): string {
    let date: any;
    const reg = /^[1-9]{1}[0-9]{9}$/;
    const reg2 = /^[1-9]{1}[0-9]{12}$/;
    const timestampStr = timestamp.toString();
    if (timestamp && (reg.test(timestampStr) || reg2.test(timestampStr))) {
      if (timestampStr.length < 13) {
        date = new Date(Number(timestamp) * 1000);
      } else {
        date = new Date(Number(timestamp) * 1);
      }
    } else {
      return "错误的时间戳格式";
    }
    const Y = String(date.getFullYear());
    let M = String(date.getMonth() + 1);
    let d = String(date.getDate());
    let h = String(date.getHours());
    let m = String(date.getMinutes());
    let s = String(date.getSeconds());

    if (isFill) {
      M = Number(M) < 10 ? `0${M}` : M;
      d = Number(d) < 10 ? `0${d}` : d;
      h = Number(h) < 10 ? `0${h}` : h;
      m = Number(m) < 10 ? `0${m}` : m;
      s = Number(s) < 10 ? `0${s}` : s;
    }
    p = p || "%Y-%M-%d %h:%m:%s";
    p = p
      .replace(/%Y/g, Y)
      .replace(/%M/g, M)
      .replace(/%d/g, d)
      .replace(/%h/g, h)
      .replace(/%m/g, m)
      .replace(/%s/g, s);
    return p;
  },
};
