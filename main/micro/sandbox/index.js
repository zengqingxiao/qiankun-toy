import { performScriptForEval } from './performScript'
// import { SnapShotSandbox } from './snapShotSandbox'
import { ProxySandbox } from './proxySandbox'

// 判断是否有生命周期的全部函数
const isCheckLifeCycle = lifecycle => lifecycle &&
  lifecycle.bootstrap &&
  lifecycle.mount &&
  lifecycle.unmount

// 子应用生命周期处理， 环境变量设置
export const sandBox = (app, script) => {
  
  // 创建代理沙箱 和 快照沙箱不一样
  const proxy = new ProxySandbox() // 激活「沙箱」代理对象

  if (!app.proxy) {
    app.proxy = proxy // 绑定 沙箱对象
  }

  // 1. 设置环境变量
  window.__MICRO_WEB__ = true

  // 2. 运行js文件
  // app.proxy.proxy 全局 window「沙箱」
  const lifecycle = performScriptForEval(script, app.name, app.proxy.proxy)
  console.log(lifecycle, 'lifecycle-------------')

  // 子生命周期，挂载到app上
  // 这里被遍历说因为只要一个js文件上有 生命周期函数
  if (isCheckLifeCycle(lifecycle)) {
    app.bootstrap = lifecycle.bootstrap
    app.mount = lifecycle.mount
    app.unmount = lifecycle.unmount
  }
}
