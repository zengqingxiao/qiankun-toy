
// 执行js脚本 的2种方式
export const performScriptForFunction = (script, appName, global) => {
  window.proxy = global
  // console.log(global)
  // 为什么这里要window.proxy 因为 new Function 里面只可以获取到window，
  // window「形参」 = window.proxy = global，只是一个指向代理的指针
  // 而 形参数window 只是只向一个代理，所以一个页面多个子应用也是可以
  const scriptText = `
    return ((window) => {
      ${script}
      return window['${appName}'] // 运行 脚本，运行玩返回当前window上的值，只有实例上的一个js有，其他js上说没有实例的
    })(window.proxy)
  `
  // 其实这里遍历 放进去的window 也就是 main.js打包后的文件，主要是想针对这个文件做处理
  return new Function(scriptText)()
}

export const performScriptForEval = (script, appName, global) => {
  // library window.appName
  window.proxy = global // 代理沙盒
  const scriptText = `
    ((window) => {
      ${script}
      return window['${appName}']  // 获取绑定在 window上面的生命周期
    })(window.proxy)
  `
  // eval 中的执行环境需要注意
  return eval(scriptText)// app module mount
}
