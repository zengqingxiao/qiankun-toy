import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

const render = () => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
}

// 如果不是在微前端的情况下执行 render函数
if (!window.__MICRO_WEB__) {
  render()
}

// 下面是暴露出去的生命周期

// 开始加载
export async function bootstrap() {
  console.log('bootstrap');
}

// 加载成功，渲染成功
export async function mount() {
  window.custom.emit('test1', {
    a: 1
  })
  render()
}

// 卸载
export async function unmount(ctx) {
  console.log(ctx,'ctx')
  // const { container = '' } = ctx
  // if (container) {
  //   document.querySelector(container).innerHTML = ''
  // }
}
