// const Promise = require("./Promise/v1")
const Promise = require("./Promise/v3")
let a = new Promise((resolve, reject)=>{
    console.log("1")
    setTimeout(()=>{
        reject(2)
    }, 1000)
})

function settime(value, time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(value)
        }, time)
    })
}
let b = Array(10).fill(1)
b = b.map((item, i)=>settime(i, i*1000))
b[0] = (new Promise((r, e)=>{
    e(0)
}))
Promise.race(b).then((e)=>{
    console.log(e)
},(e)=>{
    console.log(e)
})