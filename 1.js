// 带标签的模板字符串

// const username = 'care'
// const temp = 'template'

// function tag(p, t, n) {
//     console.log(p, t, n)
//     n = n.toUpperCase()
//     return p[0] + t + p[1] + n
// }

// const result = tag`hello ${temp} I'm ${username}`
// console.log(result)

// function show(flag) {
//     // flag = flag || true
//     flag = flag === undefined ? true : flag // 最好的判断是拿变量和 undefined 判断
//     console.log(flag)
// }
// function show(flag) {
//     // flag = flag === undefined ? true : flag
//     // flag = flag || true // 参数默认值，只表示当使用者没有主动传递参数时指定的默认值
//     // flag = flag === undefined ? true : flag
//     flag = typeof flag === 'undefined' ? true : flag
//     console.log(flag)
// }
// function show(flag = true) {
//     console.log(flag)
// }

// show(0)

// const name = 'care'

// let obj = {
//     name: '123'
// }

// console.log(obj)

// const source1 = {
//     a: 123,
//     b: 123
// }
// const target1 = {
//     a: 456,
//     c: 456
// }
// const source2 = {
//     c: 456,
//     d: 789
// }

// const result = Object.assign(target1, source1, source2)
// console.log(target1)
// console.log(target1 === result)

// proxy
// const person = {
//     name: 'zlc',
//     age: 20
// }

// // 专门为对象设置代理器的
// // 返回的是一个代理对象
// const personProxy = new Proxy(person, {
//     get(target, property) {
//         return property in target ? target[property] : 'default'
//         // console.log('get', target, property)
//         // return target[property]
//     },
//     set(target, property, value) {
//         // 先判断 property 是否是合法属性
//         if (property === 'age') {
//             if (!Number.isInteger(property)) {
//                 throw new TypeError(`${value} is not an int`)
//             }
//         }
//         target[property] = value
//     }
// })

// // personProxy.age = 22
// // console.log(personProxy.age)
// console.log(personProxy.name)

// 使用 proxy 监视数组

// let list = []

// let listProxy = new Proxy(list, {
//     set(target, property, value) {
//         console.log('set', target, property, value)
//         target[property] = value
//         return true // 表示设置成功
//     }
// })

// listProxy.push(2)

// Reflect 统一的对象操作API，属于一个静态类（不能通过 new 的形式进行实例化，只能通过打点的形式调用某些方法）

// const obj = {
//     name: 'zlc',
//     age: 20
// }
// // console.log('name' in obj)
// // console.log(delete obj['name'])
// // console.log(Object.keys(obj))

// // console.log('-----')

// console.log(Reflect.has(obj, 'name'))
// console.log(Reflect.deleteProperty(obj, 'name'))
// console.log(Reflect.ownKeys(obj))

// let person = {
//     name: 'zlc',
//     age: 20
// }

// const proxy = new Proxy(person, {
//     get(target, property) {
//         // console.log('get', target, property)
//         // return target[property]
//         return property in target ? target[property] : 'default'
//     },
//     set(target, property, value) {
//         if (property === 'gender') {
//             if (!['男', '女'].includes(value)) {
//                 throw new TypeError(`${value} is not valid gender type`)
//             }
//         }
//         console.log('set', target, property, value)
//         return target[property] = value
//     }
// })

// proxy.gender = '男'
// console.log(person.gender)

// console.log(proxy.xxx)
// const obj = {
//     name: 'zlc',
//     age: 20
// }

// console.log('name' in obj)
// console.log(delete obj.name)
// console.log(Object.keys(obj))

// console.log(Reflect.has(obj, 'name'))
// console.log(Reflect.deleteProperty(obj, 'name'))
// console.log(Reflect.ownKeys(obj))

// let person = {
//     name: 'zlc',
//     age: 20
// }

// let proxy = new Proxy(person, {
//     get(target, property) {
//         // return target[property]
//         return Reflect.get(target, property)
//     },
//     set(target, property, value) {
//         return Reflect.set(target, property, value)
//     }
// })

// // console.log(proxy.name)
// proxy.gender = '男'
// console.log(proxy.gender)

// function isObject(target) {
//     return typeof target === 'object' && target !== null
// }

// let toProxy = new WeakMap()
// let toRaw = new WeakMap()

// function reactive(target) {
//     if (!isObject(target)) {
//         throw new TypeError(`${target} is not valid data type`)
//     }

//     if (toProxy.has(target)) {
//         return toProxy.get(target)
//     }

//     if (toRaw.has(target)) {
//         return target
//     }

//     let handler = {
//         get(target, property) {
//             return Reflect.get(target, property)
//         },
//         set(target, property, value) {
//             return Reflect.set(target, property, value)
//         }
//     }

//     let observed = new Proxy(target, handler)
//     // 如果这个对象，已经被代理过了，就不需要再被代理了
//     toProxy.set(target, observed)
//     toRaw.set(observed, target)
//     console.log('----')

//     return observed
// }

// let person = {
//     name: 'care',
//     age: 20
// }

// let p = reactive(person)
// // reactive(person)
// // reactive(person)
// // reactive(person)
// // 如果代理对象重复被代理
// reactive(p)
// reactive(p)
// reactive(p)
// p.name = 'zlc'

/**
 * 1、Promise 是一个类，在实例化这个类的时候 需要传递一个执行器（execute /ˈeksɪkjuːt/）进去，执行器会立即执行
 * 2、Promise 有三种状态，分别为 成功 fulfilled 失败 rejected 等待 pending
 *      pending -> fulfilled
 *      pending -> rejected
 *  状态一旦改变，就不能更改了
 * 3、resolve 和 reject 函数是用来更改状态的
 *      resolve -> fulfilled
 *      reject -> rejected
 * 4、then 方法：对状态进行判断，如果当前是成功态，就调用第一个成功回调
 *          如果当前是失败态，就调用失败回调    
 */

const MyPromise = require('./myPromise')

let p1 = function () {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p1')
        }, 1000)
    })
}

let p2 = function () {
    return new MyPromise((resolve, reject) => {
        resolve('p2')
    })
}

MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(result => {
    console.log(result)
})

// let p = new MyPromise((resolve, reject) => {

//     // setTimeout(() => {
//     //     // resolve('成功')
//     //     resolve('我错了')
//     // })
//     resolve('45')
// })



// function other() {
//     return new MyPromise((resolve, reject) => {
//         resolve('other')
//     })
// }

// let p1 = p.then(value => {
//     console.log('value', value)
//     // return other()
//     // return new MyPromise((resolve, reject1) => {
//     //     reject1('other')
//     // })
//     return p1
// })

// // .then(v => {
// //     console.log('v', v)
// // })

// p1.then(r => {
//     console.log(r)
// }, a => {
//     console.log(a.message)
// })