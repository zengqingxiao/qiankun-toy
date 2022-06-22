import React from 'react'
import "./index.scss"
import ReactDOM from 'react-dom'
import BasicMap from './src/router';
import { setMain } from './src/utils/main'
const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
  render()
}

export const bootstrap = () => {
  console.log('bootstrap---------------zzzzzzzzzz')
  return {a: '返回给主应用参数'}
}

export const mount = (app) => {
  console.log(app, 'app-----')
  setMain(app) // 子应用获取 父级的方法 来隐藏一些不需要的东西
  render()
}

export const unmount = () => {
  console.log('卸载')
}
