// 完善Promise
// 将resolve、reject定义在Promise函数内部
// 将then移到Promise原型上
// 实现Promise.all、Promise.allSettled、Promise.any、Promise.race、Promise.resolve、Promise.rejcet
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function Promise(excutor){
    this.state = PENDING
    this.callbacks = []
    this.data = undefined
    let that = this
    function resolve(data){
        if(that.state != PENDING) return
        that.state = RESOLVED
        that.data = data
        that.callbacks.forEach(cb=>{
            cb.onResolved(data)
        })
    }
    function reject(data){
        if(that.state != PENDING) return
        that.state = REJECTED
        that.data = data
        that.callbacks.forEach(cb=>{
            cb.onRejected(data)
        })
    }
    
    try{
        excutor(resolve, reject)
    }catch(e){
        reject(e)
    }
}

Promise.prototype.then = function(onResolved, onRejected){
    let that = this
    onResolved = typeof onResolved == "function" ? onResolved : value=>value
    onRejected = typeof onRejected == "function" ? onRejected : value=>value
    return new Promise((resolve, reject)=>{
        function handle(callback){
            try{
                let result = callback(that.data)
                if(result instanceof Promise) result.then((e)=>{
                    resolve(e)
                }, (e)=>{
                    reject(e)
                })
                else resolve(result)
            }catch(e){
                reject(e)
            }
        }
        if(this.state == PENDING){
            this.callbacks.push({onResolved(){
                handle(onResolved)
            }, onRejected(){
                handle(onRejected)
            }})
        }
        else if(this.state == RESOLVED){
            handle(onResolved)
        }
        else if(this.state == REJECTED){
            handle(onRejected)
        }
    })
}

// 这个方法返回一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。
// 如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。
// 一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。
Promise.all = function(iterable){
    return new Promise((resolve, reject)=>{
        var ret = Array(iterable.length)
        var count = 0
        iterable.forEach((pm, i)=>{
            if(pm instanceof Promise){
                pm.then((e)=>{
                    ret[i] = e
                    count++
                    // console.log(count)
                    if(count == ret.length) resolve(ret)
                }, (e)=>{
                    reject(e)
                })

            }
            else{
                ret[i] = pm
                count++
                if(count == ret.length) resolve(ret)
            }
        })
    })
}

// 等到所有 promise 都已敲定（每个 promise 都已兑现或已拒绝）。
// 返回一个 promise，该 promise 在所有 promise 都敲定后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。
Promise.allSettled = function(iterable){
    return new Promise((resolve, reject)=>{
        var ret = Array(iterable.length)
        var count = 0
        iterable.forEach((pm, i)=>{
            if(pm instanceof Promise){
                pm.then((e)=>{
                    ret[i] = e
                    count++
                    if(count == ret.length) resolve(ret)
                }, (e)=>{
                    ret[i] = e
                    count++
                    if(count == ret.length) resolve(ret)
                })
            }
            else{
                ret[i] = pm
                count++
                if(count == ret.length) resolve(ret)
            }
        })
    })
}

// 接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。
Promise.any = function(iterable){
    return new Promise((resolve, reject)=>{
        var ret = Array(iterable.length)
        var count = 0
        iterable.forEach((pm, i)=>{
            if(pm instanceof Promise){
                pm.then((e)=>{
                    resolve(e)
                }, (e)=>{
                    ret[i] = e
                    count++
                    if(count == ret.length) reject(ret)
                })
            }
            else{
                resolve(pm)
            }
        })
    })
}

// Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。
Promise.race = function(iterable){
    return new Promise((resolve, reject)=>{
        iterable.forEach((pm, i)=>{
            if(pm instanceof Promise){
                pm.then((e)=>{
                    resolve(e)
                }, (e)=>{
                    reject(e)
                })
            }
            else{
                resolve(pm)
            }
        })
    })
}

// 返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable（即，带有 then 方法的对象），返回的Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。
Promise.resolve = function(data){
    return new Promise((resolve, reject)=>{
        if(data.then) data.then(resolve, reject)
        else resolve(data)
    })
}

// 返回一个状态为已拒绝的 Promise 对象，并将给定的失败信息传递给对应的处理函数。
Promise.reject = function(data){
    return new Promise((resolve, reject)=>{
        reject(data)
    })
}

module.exports = Promise