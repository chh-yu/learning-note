// 简单实现一个订阅发布模式
var event = {
    subscribers: [],
    data: {},
    // 订阅
    on(fn){
        this.subscribers.push(fn)
    },
    // 发布
    emit(key, value){
        this.data[key] = value
        this.subscribers.forEach(fn=>{
            fn(this.data)
        })
    }
}
event.on((data)=>{
    console.log("第一位定订阅者", data)
})
event.on((data)=>{
    console.log("第二位定订阅者", data)
})
event.emit("name", "chyu")
setTimeout(() => {
    event.emit("age", 22)
}, 1000);