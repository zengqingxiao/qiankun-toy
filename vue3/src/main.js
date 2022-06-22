import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setMain } from './utils/global'

let instance = null; // 获取实例

function render() {
  instance = createApp(App);
  instance
    .use(router)
    .mount('#app');
}

if (!window.__MICRO_WEB__) {
  render();
}
export async function bootstrap() {
  console.log('vue3.0 app bootstrap');
}

export async function mount(app) {
  window.custom.on('test1', (data) => {
    console.log('获取来自其他 子应用传来的值----',data)
  })
  setMain(app) // 通过传进来的app 来获取主饮用的方法 
  render();
}

export async function unmount(ctx) {
  instance.unmount();
  instance = null;

  console.log(ctx, 'ctx---')
  // const { container = '' } = ctx
  // if (container) {
  //   document.querySelector(container).innerHTML = ''
  // }
}
