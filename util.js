/* 防抖（非立即执行版） */ 
var debounce_v1 = function(func, wait){
    let timeout
    return function(){
        // 防抖函数的代码使用这两行代码来获取 this 和 参数，是为了让 debounce 函数最终返回的函数 this 指向不变以及依旧能接受到 e 参数。
        let context = this
        let args = arguments
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(()=>{
            func.apply(context, args)
        }, wait)
    }
}

/* 防抖（立即执行版） */
var debounce_v2 = function(func, wait){
    let timeout
    return function(){
        let context = this
        let args = arguments
        if(!timeout) func.apply(context, args)
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(()=>{
            timeout = null
        }, wait)
    }
}

/* 防抖（双剑合璧版） */
var debounce_v3 = function(func, wait, immediate){
    let timeout
    return function(){
        let context = this
        let args = arguments
        if(!immediate){
            if(timeout) clearTimeout(timeout)
            timeout = setTimeout(()=>{
                func.apply(context, args)
            }, wait)
        }else{
            if(!timeout) func.apply(context, args)
            if(timeout) clearTimeout(timeout)
            timeout = setTimeout(()=>{
                timeout = null
            }, wait)
        }
    }
}

/* 节流(时间戳版) */
var throttle_v1 = function(func, wait){
    let previous = 0
    return function(){
        let args = arguments
        let context = this
        let now = new Date()
        if(now - previous > wait){
            func.apply(context, args)
            previous = now
        }
    }
}

/* 节流(定时器版) */
var throttle_v2 = function(func, wait){
    let timeout
    return function(){
        let args = arguments
        let context = this
        if(!timeout){
            timeout = setTimeout(()=>{
                func.apply(context, args)
                timeout = null
            }, wait)
        }
    }
}