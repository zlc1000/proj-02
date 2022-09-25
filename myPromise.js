
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {

    constructor(executor) {
        executor(this.resolve, this.reject)
    }

    status = PENDING
    value = undefined
    reason = undefined
    successCallBacks = []
    failCallBacks = []

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            this.successCallBacks && this.successCallBacks.forEach(fn => fn(this.value))
        }
    }

    reject = (reason) => {
        if (this.status === PENDING) {
            console.log('yy', reason)
            this.status = REJECTED
            this.reason = reason
            this.failCallBacks && this.failCallBacks.forEach(fn => fn(this.reason))
        }
    }

    then(successCallBack, failCallBack) {
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                let x = successCallBack(this.value)
                resolve(x)
            } else if (this.status === REJECTED) {
                failCallBack(this.reason)
            } else if (this.status === PENDING) {
                this.successCallBacks.push(successCallBack)
                this.failCallBacks.push(failCallBack)
            }
        })

        return promise2
    }

    static all(arr) {
        return new MyPromise((resolve, reject) => {
            const result = []
            let index = 0

            function setData(i, value) {
                result[i] = value

                index++
                if (index === arr.length) {
                    resolve(result)
                }
            }

            for (let i = 0; i < arr.length; i++) {
                const current = arr[i]
                if (current instanceof MyPromise) {
                    current.then(res => setData(i, res), err => reject(err))
                } else {
                    setData(i, current)
                }
            }
        })
    }
}

module.exports = MyPromise