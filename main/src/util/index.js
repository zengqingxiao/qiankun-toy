import { registerMicroApps, start, createStore } from '../../micro'

import { loading } from '../store'

const store = createStore() // 全局状态管理

window.store = store // 这样子应用就可以修改主应用数据

const storeDate = store.getStore() //获取数据

// 添加订阅者
store.subscribe((newValue, oldValue) => {
  console.log(newValue, oldValue, '---')
})
// 更新store
store.update({
  ...storeDate,
  a: 1
})

export const registerApp = (list) => {
  // 注册到微前端框架里 「子应用，和生命周期」
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        loading.changeLoading(true) // 开始loading
        console.log('开始加载')
      }
    ],
    mounted: [
      () => {
        loading.changeLoading(false) // 关闭loading
        console.log('渲染完成')
      }
    ],
    destoryed: [
      () => {
        console.log('卸载完成')
      }
    ]
  })

  // 开启微前端框架
  start()
}
