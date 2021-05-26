import _ from "lodash";

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 替换邮箱字符
export function regEmail(email) {
  let new_email = null;
  if (String(email).indexOf("@") > 0) {
    const str = email.split("@");
    let _s = "";
    if (str[0].length > 3) {
      for (let i = 0; i < str[0].length - 3; i++) {
        _s += "*";
      }
    }
    new_email = str[0].substr(0, 3) + _s + "@" + str[1];
  }
  return new_email;
}

/**
 * 获取本地存储
 * @param {*} key
 */
export function getJsonStorage(key) {
  if (!key) throw "Key is undefined";
  const jsonStr = localStorage.getItem(key);
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    return jsonStr;
  }
}

/**
 * 存储
 * @param {string | number} key
 * @param {any} json
 */
export function setJsonStorage(key, json) {
  if (!key) throw "Key is undefined";
  const strJson = JSON.stringify(json);
  localStorage.setItem(key, strJson);
}

/**
 * 根据key 删除存储
 * @param {string | number} key
 */
export function rmJsonStorage(key) {
  if (!key) throw "Key is undefined";
  localStorage.removeItem(key);
}

export function getStorage(key) {
  if (!key) throw "Key is undefined";
  return localStorage.getItem(key);
}

export function setStorage(key, value) {
  if (!key || !value) throw "Key or Value is undefined";
  return localStorage.setItem(key, value);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * Created by jiachenpan on 16/11/18.
 */
export function parseTime(time) {
  if (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  } else {
    return "";
  }
}

/**
 * 校验字节 是否为 中/英 文
 * @param {*} byte
 * @param {*} lang
 * @returns {Boolean}
 */
function validateByte(byte, lang) {
  // 验证是否是中文
  const testZh = new RegExp("[\u4E00-\u9FA5]+");
  //验证是否是英文
  const testEn = new RegExp("[A-Za-z]+");
  let bool = false;
  switch (lang) {
    case "zh":
      bool = testZh.test(byte);
      break;
    case "en":
      bool = testEn.test(byte);
      break;
  }
  return bool;
}

/**
 * 校验 中/英 文
 * @param {String} str 字符串
 * @param {String} lang zh | en
 * @returns {Boolean}
 */
export function validateLanguage(str, lang) {
  if (_.isNil(lang)) throw "lang is Nil";
  const _lower = lang.toLowerCase();
  if (!["zh", "en"].includes(_lower)) throw "parameter lang is incorrect";
  for (let i = 0; i < str.length; i++) {
    const byte = str[i];
    if (byte !== " " && !validateByte(byte, _lower)) return false;
  }
  return true;
}

/**
 * 判断 数组target 是否完全 存在于 arr数组里
 * @param {Array} checkArr 需要判断的数组
 * @param {Array} target 目标数组
 * @returns {Array<Boolean, Boolean>} [all, part] all 全部包含 part 部分包含
 */
export function isContained(checkArr, target) {
  if (!_.isArray(checkArr) || !_.isArray(target))
    throw "checkArr or target not Array";
  let targetCache = {};
  let array = [];
  /** target to hashMap */
  target.forEach((item) => (targetCache[item] = true));

  checkArr.forEach((_id) => array.push(!!targetCache[_id]));

  let part, all;
  part = array.includes(true);
  all = !array.includes(false);

  return [all, all ? false : part];
}

/**
 * 格式化表单字段，过滤掉 空字符串 | 空数组 key
 * @param {Object} form 表单
 */
export function filterFormFields(form) {
  let _query = {};
  Object.keys(form).forEach((key) => {
    const target = form[key];
    if (_.isString(target) && target) _query[key] = form[key];
    if (_.isNumber(target) && target) _query[key] = form[key];
    if (_.isArray(target) && target.length !== 0) _query[key] = form[key];
  });
  return _query;
}

/**
 * arrayList to hashMap
 * @param {Array} arr
 * @param {String|Number} key
 */
export function arrayToHashMap(arr, key) {
  let cache = {};
  arr.forEach((item, i) => {
    if (key) cache[item[key]] = item;
    else cache[item] = i;
  });
  return cache;
}
