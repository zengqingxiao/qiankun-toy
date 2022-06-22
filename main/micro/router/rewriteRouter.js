import { patchRouter } from '../utils'
import { turnApp } from './routerHandle'

// 重写window的路由跳转 「实现路由拦截」，监听路由变化，每一次路由变化，都会执行一次自定义事件「micro_push，micro_replace」
export const rewriteRouter = () => {
  window.history.pushState = patchRouter(window.history.pushState, 'micro_push')
  window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace')

  window.addEventListener('micro_push', turnApp)
  window.addEventListener('micro_replace', turnApp)

  // 监听返回事件 「回退触发」
  window.onpopstate = async function () {
    await turnApp()
  }
}
