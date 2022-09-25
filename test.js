// let 使用 var 声明的双重for循环问题

// for(let i = 0; i < 3; i++) {
//     for(let i = 0; i < 3; i++) {
//         console.log(i)
//     }
//     console.log('外层循环的 i = ', i)
// }

// for(let i = 0; i < 3; i++) {
//     let i = 100
//     console.log(i)
// }

// const path = '/src/user/getlist'

// console.log(path.split('/'))

// const [, rootPath] = path.split('/')

// console.log(rootPath)

// const username = 'jack'
// const user = { password: 123456 }

// const { username: uname = 'care' } = user

// console.log(uname)

// 带标签的模板字符串

// function show(flag = true) {
//     // flag = flag || true
//     // flag = typeof flag === 'undefined' ? true : flag // 原理是判断形参的所属类型，如果是 'undefined' 就给默认值，否则以传入的为准
//     console.log(flag)
// }

// show(0)

// Proxy 代理

// let person = {
//     name: 'zlc',
//     age: 26
// }

// let p = new Proxy(person, {
//     get(target, property) {
//         // console.log('get', target, property)
//         // return target[property]
//         return property in target ? target[property] : 'default'
//     },
//     set(target, property, value) {
//         // console.log('set', target, property, value)
//         // target[property] = value
//         if (!['男', '女'].includes(value)) {
//             throw new TypeError(`${value} is not a valid sex type`)
//         }
//         target[property] = value
//     }
// })

// // console.log(p.sex)
// p.sex = '女1'
// console.log(p.sex)
// // console.log(p.age)
// // p.age = 28
// // delete p.name

// let list = []

// let proxy = new Proxy(list, {
//     set(target, property, value) {
//         // 给数组进行push操作时，1、内部自动会找到要操作的索引位置  2、把值添加进去之后修改数组的长度
//         console.log('set', target, property, value)
//         target[property] = value
//         return true
//     }
// })

// proxy.push('黑马')
// console.log(proxy)
// let arr = []

// let p = new Proxy(arr, {
//     set(target, property, value) {
//         if (!Number.isInteger(value)) {
//             throw new TypeError(`${value} is not valid elements type`)
//         }
//         console.log(target, property, value)
//         return target[property] = value
//     }
// })

// p.push('1')

// console.log(p)

const obj = {
    name: 'zlc',
    age: 20
}

// console.log('name' in obj)
// console.log(delete obj.name)
// console.log(Object.keys(obj))
// Reflect 反射
console.log('---')
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'name'))
console.log(Reflect.ownKeys(obj))


let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let newArr = []
for (var i = 0; i < arr.length; i += 5) {
    newArr.push(arr.slice(i, i + 5));
}

console.log(newArr)