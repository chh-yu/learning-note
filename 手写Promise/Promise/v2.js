// v2版本，实现链式调用
//总结：链式调用，将.then()内的回调函数交给调用它的promise对象，并且then返回的promise对象会订阅调用then的promise对象的resolve和reject事件，当调用then的promise对象执行resolve或reject时，then返回的promise对象的excutor就会开始执行
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function Promise(excutor){
    this.state = PENDING
    this.data = undefined
    this.next = null
    this.callbacks = []
    this.resolve = (value)=>{
        if(this.state != PENDING) return
        this.state = RESOLVED
        this.data = value
        this.callbacks.forEach(cbs=>cbs.onResolved())
    }
    this.reject = (error)=>{
        if(this.state != PENDING) return
        this.state = REJECTED
        this.data = error
        this.callbacks.forEach(cbs=>cbs.onRejected())
    }
    this.then = (onResolved, onRejected)=>{
        var that = this
        onResolved = typeof onResolved == 'function' ? onResolved : value=>value
        onRejected = typeof onRejected == 'function' ? onRejected : value=>value
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
    try {
        excutor(this.resolve, this.reject)
    } catch (error) {
        this.reject(error)
    }
}


module.exports = Promise