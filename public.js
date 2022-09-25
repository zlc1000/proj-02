// 使用 var 声明的双层循环问题

// for (var i = 0; i < 3; i++) {
//     for (let i = 0; i < 3; i++) {
//         console.log('i = ' + i)
//     }
//     console.log('外层循环中的i = ' + i)
// }

// for(let i = 0; i < 3; i++) {
//     let i = 100
//     console.log(i)
// }

// let i = 0
// if (i < 3) {
//     let i = 100
//     console.log(i)
// }

// i++

// if (i < 3) {
//     let i = 100
//     console.log(i)
// }

// i++

// if (i < 3) {
//     let i = 100
//     console.log(i)
// }
// i++

// 解构
// const path = '/src/user/getlist'

// const [, root] = path.split('/') // ['', 'src, 'user', 'getlist']

// console.log(root)

// const username = 'jack'
// const user = { password: 123456 }

// const { username: uname = 'zlc' } = user

// console.log(uname)

// 模板字符串

// const uname = 'care'
// const work = 'development'

// const temp = tag`I'm ${uname}, I love front-end ${work}`

// function tag(str, n, w) {
//     // console.log(str, n, w)
//     // 在这里，可以加入自定义操作
//     // n -> care => Care
//     n = n.charAt(0).toUpperCase() + n.slice(1)

//     return str[0] + n + str[1] + w
//     // return 
// }

// console.log(temp)


// 参数默认值问题

// function show(flag = true) {
//     // flag = flag || true // 最原始的添加参数默认值的写法 ||
//     // flag = typeof flag === 'undefined' ? 'default' : flag
//     console.log(flag)
// }

// show()


// let obj = {}
// let temp = {}

// Object.defineProperty(obj, 'name', {
//     get() {
//         console.log('get')
//         return temp['name']
//     },
//     set(v) {
//         console.log('set', v)
//         // obj['name'] = v
//         temp['name'] = v
//     }
// })

// obj.name = 'zlc'

// console.log(obj.name)


// Proxy 代理

// let person = {
//     name: 'zlc',
//     age: 26
// }

// let p = new Proxy(person, {
//     get(target, property) {
//         // console.log('get', target, property)
//         if (!(property in target)) {
//             throw new TypeError(`${property} is not a valid property`)
//         }
//         return target[property]
//     },
//     set(target, property, value) {
//         if (!['男', '女'].includes(value)) {
//             throw new TypeError(`${value} is not a valid value`)
//         }
//         console.log('set', target, property, value)
//         target[property] = value
//     }
// })

// // console.log(p.name)
// p.sex = 'xx'

// console.log(p.sex)

// let arr = [1, 2, 3, 4]

// let p = new Proxy(arr, {
//     set(target, property, value) {
//         if (!target.hasOwnProperty(property)) {
//             console.log('set', target, property, value)
//             target[property] = value
//         }

//         return true
//     }
// })

// p.push('zlc')

// console.log(p)

// const obj = {
//     name: 'zlc',
//     age: 20
// }

// // console.log('name' in obj)
// // console.log(delete obj.name)
// // console.log(Object.keys(obj))

// console.log(Reflect.has(obj, 'name'))
// console.log(Reflect.deleteProperty(obj, 'age'))
// console.log(Reflect.ownKeys(obj))


// Promise 的实现
// 1、Promise 是一个类，在实例化期间需要传递一个执行器（executor），
// 就是一个函数，这个函数会立即执行
// 2、Promise 有三种状态：等待态 pending、成功态 fulfilled、
// 失败态 rejected（特点：状态一旦改变，不能更改）
// const MyPromise = require('./myPromise')

// let p = new MyPromise((resolve, reject) => {
//     // resolve(123)
//     resolve(456)
// })

// p.then(data => {
//     console.log('success', data)
//     return 1
// }, error => {
//     console.log('fail', error)
// })
//     .then(res => {
//         console.log('下一个 then，', res)
//     })

// p.then(data => {
//     console.log('success', data)
// }, error => {
//     console.log('fail', error)
// })

// p.then(data => {
//     console.log('success', data)
// }, error => {
//     console.log('fail', error)
// })

const MyPromise = require('./myPromise')

let p1 = function () {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('zlc')
        }, 1000)
    })
}
let p2 = function () {
    return new MyPromise((resolve, reject) => {
        resolve('28')
    })
}

MyPromise.all(['hm', p1(), p2()]).then(result => {
    console.log(result)
})