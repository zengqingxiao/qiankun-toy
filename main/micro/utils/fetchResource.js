// Response mixin 的 text() 方法提供了一个可供读取的“返回流”（Response stream），
// 并将它读取完。它返回一个包含 USVString 对象（也就是文本）的 Promise 对象，返回结果的编码永远是 UTF-8。
export const fetchResource = url => fetch(url).
then(async res => {
    console.log(res, 'res------')
    return await res.text()
})
