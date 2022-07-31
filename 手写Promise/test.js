// const Promise = require("./Promise/v1")
const Promise = require("./Promise/v2")

let a = new Promise((resolve, reject)=>{
    console.log("1")
    setTimeout(()=>{
        reject(2)
    }, 1000)
})
a.then((data)=>{
    console.log(data)
    return "data"
}, (err)=>{
    console.log(err)
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("err")
        }, 2000)
    })
})
.then((e)=>{
    console.log("我滴链式调用，完成啦！！！", e)
})
a.then((e)=>{
    console.log(e+100)
}, (e)=>{
    console.log(e+100)
})