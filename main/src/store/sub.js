import { loading } from '../store'
import * as appInfo from '../store'
// 子路由信息
export const subNavList = [
  {
    name: 'react15',// 唯一
    entry: '//localhost:9001/', // url地址
    loading, // loading 方法
    container: '#micro-container', // 展示的容器
    activeRule: '/react15', // 子应用路由
    appInfo, // 当前 子路由的一些方法，放生命周期的
  },
  {
    name: 'react16',
    entry: '//localhost:9003/',
    loading,
    container: '#micro-container',
    activeRule: '/react16',
    appInfo,
  },
  {
    name: 'vue2',
    entry: '//localhost:9004/',
    loading,
    container: '#micro-container',
    activeRule: '/vue2',
    appInfo,
  },
  {
    name: 'vue3',
    entry: '//localhost:9005/',
    loading,
    container: '#micro-container',
    activeRule: '/vue3',
    appInfo,
  },
];

