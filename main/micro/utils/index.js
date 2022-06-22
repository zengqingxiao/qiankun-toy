import { getList } from "../const/subApps";
// 给当前的路由跳转打补丁「每一次执行路由跳转都会执行eventName事件」
export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName)
    globalEvent.apply(this, arguments)
    window.dispatchEvent(e)
  }
}

// 查找符号合当前路由的应用
export const currentApp = () => {
  const currentUrl = window.location.pathname
  // activeRule 子应用信息字端； currentUrl当前路由
  return filterApp('activeRule', currentUrl)
}

// 获取路由
export const findAppByRoute = (router) => {
  return filterApp('activeRule', router)
}

export const filterApp = (key, value) => {
  const currentApp = getList().filter(item => item[key] === value)
  // 容错写法
  return currentApp && currentApp.length ? currentApp[0] : {}
}

// 子应用是否做了切换
// true：表示切换；false表示没有被切换
export const isTurnChild = () => {
  const { pathname, hash } = window.location
  const url = pathname + hash

  // 当前路由无改变。
  const currentPrefix = url.match(/(\/\w+)/g)

  if (
    currentPrefix &&
    (currentPrefix[0] === window.__CURRENT_SUB_APP__) &&
    hash === window.__CURRENT_HASH__
  ) {
    return false;
  }

  // 起源app  = 当前app；之后起源app可以当成上一次的子应用
  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__;
  // match 返回一个数组第一项的是对应的值，第二项是全部的字符串长度
  const currentSubApp = window.location.pathname.match(/(\/\w+)/)
  if (!currentSubApp) {
    return false
  }
  // 当前路由以改变，修改当前路由
  window.__CURRENT_SUB_APP__ = currentSubApp[0]; // 更新子应用的值

  // 判断当前hash值是否改变
  window.__CURRENT_HASH__ = hash

  return true;
}
