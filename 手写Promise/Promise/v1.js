// v1版本，不能链式调用
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function Promise(excutor){
    this.state = PENDING
    this.successData = undefined
    this.errorData = undefined
    this.next = null
    this.resolveList = []
    this.rejectList = []
    this.resolve = (value)=>{
        if(this.state != PENDING) return
        this.state = RESOLVED
        this.successData = value
        this.resolveList.forEach(fn=>fn())
    }
    this.reject = (error)=>{
        if(this.state != PENDING) return
        this.state = REJECTED
        this.errorData = error
        this.rejectList.forEach(fn=>fn())
    }
    this.then = (resolveFn, rejectFn)=>{
        if(resolveFn) this.resolveList.push(()=>{
            resolveFn(this.successData)
        })
        if(rejectFn) this.rejectList.push(()=>{
            rejectFn(this.errorData)
        })
    }
    excutor(this.resolve, this.reject)
}


module.exports = Promise