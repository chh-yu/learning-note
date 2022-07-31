// 简单实现一个观察者模式

// 被观察者类
class Subject{
    constructor(name){
        this.name = name
        this.observer = []
        this.state = 'happy'
    }
    // 订阅
    attch(ob){
        this.observer.push(ob)
    }
    setState(state){
        this.state = state
        this.observer.forEach((ob)=>{
            ob.update(state)
        })
    }
}
// 观察者类
class Observer{
    constructor(name){
        this.name = name
    }
    update(state){
        console.log(`${this.name}: 我的朋友心情${state}`)
    }
}

let subject = new Subject("小明")

let ob1 = new Observer("小红")
let ob2 = new Observer("小蓝")
subject.attch(ob1)
subject.attch(ob2)
subject.setState("sad")