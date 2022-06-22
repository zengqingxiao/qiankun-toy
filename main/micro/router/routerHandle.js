import { isTurnChild } from '../utils'
import { lifecycle } from '../lifeCycle'

export const turnApp = async () => {
  // console.log('路由切换啦')
  // isTurnChild： 子应用是否做了切换
  if (isTurnChild()) {
    // 微前端的生命周期执行，进来了说明是可以执行的
    await lifecycle()
  }
}
