// 快照沙箱
// 应用场景：比较老版本的浏览器，
export class SnapShotSandbox {
  constructor() {
    // 1. 代理对象
    this.proxy = window

    this.active() // new 就激活代理对象
  }
  // 沙箱激活
  active() {
    // 创建一个沙箱快照
    this.snapshot = new Map()

    // 遍历全局环境 「这里其实还需要遍历递归，获取到全部的深度对象的值」；所以可以使用 代理的方法 proxy
    // 没有深度遍历一个页面就没办法，支持多个子应用不然window数据就乱啦
    for(const key in window) {
      this.snapshot[key] = window[key]
    }
  }
  // 沙箱销毁
  inactive () {
    for (const key in window) {
      if (window[key] !== this.snapshot[key]) {
        // 还原操作
        window[key] = this.snapshot[key]
      }
    }
  }
}
