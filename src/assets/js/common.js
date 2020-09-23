const deepClone = function (data) {
  let type = this.getType(data);
  let obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(this.deepClone(data[i]));
    }
  } else if (type === "object") {
    for (let key in data) {
      obj[key] = this.deepClone(data[key]);
    }
  }
  return obj;
}
const getType = function (obj) {
  //tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
}

const trimAll = function (str) {//去除所有空格
  return str.replace(/\s*/g, "")
}

const trimSE = function (str) {//去除两端空格
  return str.replace(/^\s*|\s*$/g, "")
}

const isNumber = function (number) {//去除两端空格
  return /^\d+$/.test(number)
}

const GetRequest = function () {
  var url = decodeURI(location.search); //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
// 获取cookie数值
const getCookie = function (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
// 节流函数
const throttle = function (func, wait) {
  let lastTime = null
  let timeout
  return () => {
    let context = this;
    let now = new Date();
    let arg = arguments;
    if (now - lastTime - wait > 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(context, arg)
      lastTime = now
    } else if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, arg)
      }, wait)
    }
  }
}

/**
* @description: 判断浏览器窗口到元素底部距离
*/
function toPointPosition (scrollEL, contentEL, ah, type) {
  if (type == 1) {
    scrollEL.scrollTop(0)
  } else {
    let sh = scrollEL.height();
    let ch = contentEL.height();
    let H = ch + ah;
    scrollEL.animate({ scrollTop: H + 'px' }, 300)
  }
}

let siteURL
const href = window.location.href
if (href.includes('test')) {
  siteURL = '//test.console.zhihuokeji.com'
} else {
  if (href.includes('localhost')) {
    siteURL = '//localhost:3000'
  } else {
    siteURL = '//console.tgsaas.com'
  }
}
// 过期跳转
const goToLogin = function () {
  let redirectUrl = encodeURIComponent(window.location.href);
  window.location.href = siteURL + '/login?redirectUrl=' + redirectUrl;
}
// 全局处理
const dealResult = (_this, type, msg,) => {
  _this.$store.state.globalLoading = type;
  _this.$store.state.globalMessage = msg
  setTimeout(() => {
    _this.$store.state.globalLoading = false;
  }, _this.$store.state.globalTime)
}
export default {
  deepClone,
  getType,
  trimAll,
  trimSE,
  isNumber,
  GetRequest,
  throttle,
  getCookie,
  toPointPosition,
  goToLogin,
  dealResult,
  siteURL
}