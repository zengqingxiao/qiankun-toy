// 代理沙箱

let defaultValue = {} // 子应用的沙箱容器

// 代理沙箱 --》 支持多实例
export class ProxySandbox{
  constructor() {
    this.proxy = null;

    this.active()
  }
  // 沙箱激活
  active() {
    // 子应用需要设置属性，
    // 对代理对象「Proxy的第一个参数」进行拦截
    this.proxy = new Proxy(window, {
      get(target, key) {
        // 对函数值的this指向处理好
        if (typeof target[key] === 'function') {
          return target[key].bind(target) // 返回绑定this多函数
        }
        return defaultValue[key] || target[key]
      },
      // 添加属性
      set(target, key, value) {
        defaultValue[key] = value
        console.log(key, 'proxy,触发了代理----')
        return true
      }
    })

  }

  // 沙箱销毁
  inactive () {
    defaultValue = {}
  }
}
