import { findAppByRoute } from '../utils'
import { getMainLifecycle } from '../const/mainLifeCycle'
import { loadHtml } from '../loader'

// 生命周期处理
export const lifecycle = async () => {
  // 获取到上一个子应用，要卸妆
  // findAppByRoute 获取路由 ；window.__ORIGIN_APP__ 上一个路由
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)

  // 获取到要跳转到的子应用，要加载
  // window.__CURRENT_SUB_APP__ 下一个路由
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)
  
  // 没有下一个子应用退出
  if (!nextApp) {
    return
  }
  // 对上一个子应用处理销毁
  // 当存在的时候上一个子应用的时候
  if (prevApp && prevApp.unmount) {
    // 判断是否有沙箱
    if (prevApp.proxy) {
      prevApp.proxy.inactive() // 将沙箱销毁
    }
    // 上一个销毁
    await destoryed(prevApp)
  }

  // 新的创建
  const app = await beforeLoad(nextApp)

  await mounted(app)
}
// 安装前
export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad') // 先执行主应用的
  // 暂时还不知道什么时候绑定的方法，这里应该是要注释的
  //  app && app.beforeLoad && app.beforeLoad()
  // 
  // 每一次路由切换都会执行lifecycle 函数，就会切换loadHtml
  const subApp = await loadHtml(app) // 获取的是子应用的内容
  let param = subApp && subApp.bootstrap && subApp.bootstrap()
  console.log(param, '参数返回参数---')
  return subApp
}
// 安装好
export const mounted = async (app) => {

  // 执行子应用的生命周期，
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  })

  await runMainLifeCycle('mounted') // 执行主应用的生命周期
}

export const destoryed = async (app) => {
  app && app.unmount && app.unmount()

  // 对应的执行以下主应用的生命周期
  await runMainLifeCycle('destoryed')
}

// 获取对应的 主应用的生命周期中的某一个方法
export const runMainLifeCycle = async (type) => {
  const mainlife = getMainLifecycle()
  // 对应的生命周期上一个数组，数组里面可以是多个函数，每一个函数都可以是promise
  // 这里通过async await 将函数1⃣️promise 返回
  await Promise.all(mainlife[type].map(async item => await item()))
}
