/**
 * @description: 操作本地的session，storage
 * @function {session.get} 获取本地数据
 * @function {session.put} 存储为本地数据,isPersistence:true,存放storage
 * @function {session.clear} 清空本地缓存，isAlsoClearPersisitent：true,storage也清空
 * @function {session.remove} 移除指定缓存
 * @function {session.pop} 获取到移除的指定缓存数据
 */


let json = {};
export const session = {
  get: function (key) {
    if (!json.hasOwnProperty(key)) {
      const valueStr = sessionStorage.getItem(key) || localStorage.getItem(key);
      if (valueStr) {
        json[key] = JSON.stringify(valueStr);
      }
    }
    return json[key];
  },
  put: function (key, value, isPersistence = false) {
    if (value === null || value === undefined || isNaN(value)) {
      this.remove(key);
      return;
    }
    json[key] = value;
    const valueStr = JSON.stringify(value);
    if (isPersistence) {
      localStorage.setItem(key, valueStr);
    } else {
      sessionStorage.setItem(key, valueStr);
    }
  },
  clear: function (isAlsoClearPersisitent) {
    json = {};
    sessionStorage.clear();
    if (isAlsoClearPersisitent) {
      localStorage.clear();
    }
  },
  remove: function (key) {
    delete json[key];
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  },
  pop: function (key) {
    const val = this.get(key);
    this.remove(key);
    return val;
  }
}