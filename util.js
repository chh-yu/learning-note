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

/* 拓展对象 浅拷贝与深拷贝 */
 function extend() {
    var aLength = arguments.length;
    var options = arguments[0];
    var target = {};
    var copy;
    var i = 1;
    if (typeof options === "boolean" && options === true) {
        //深拷贝 (仅递归处理对象)
        for (; i < aLength; i++) {
            if ((options = arguments[i]) != null) {
                if (typeof options !== 'object') {
                    return options;
                }
                for (var name in options) {
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    target[name] = extend(true, options[name]);
                }
            }
        }
    } else {
        //浅拷贝
        target = options;
        if (aLength === i) {
            target = this;
            i--;
        } //如果是只有一个参数，拓展功能 如果两个以上参数，将后续对象加入到第一个对象
        for (; i < aLength; i++) {
            options = arguments[i];
            for (var name in options) {
                target[name] = options[name];
            }
        }
    }
    return target;
}

/* 复杂类型判读 */
function typejudge(i){
    if(i == null) return "null"
    if(i == undefined) return "undefined"
    if(typeof i != 'object'){
        return typeof i
    }
    if(i instanceof Array) return "Array"
    if(i instanceof Function) return "Function"
    return "Object"
}

/* 封装一个instanceof功能的方法 */
function judge(target, origin){
    if(target.__proto__ == undefined){
      return false
    }
    if(target == Object.prototype && origin != Object){
      return false
    }
    if(typeof target == 'object'){
      if(target.__proto__ == origin.prototype)
        return true
      else
        return judge(target.__proto__, origin)
    }
    else{
      if(target.prototype == origin.prototype)
        return true
      else
        return judge(target.prototype, origin)
    }
  }

/* 圣杯模式继承 */
function inherit_v1(Target, Origin){
    function F(){}
    F.prototype = Origin.prototype
    Target.prototype = new F()
    Target.prototype.constructor = Target
    Target.prototype.uber = Origin
}

/* 雅虎YUI3库圣杯模式继承, 用闭包和立即执行函数实现私有变量 */
var inherit_v2 = (function(){
    var F = function (){}
    return function(Target, Origin){
        F.prototype = Origin.prototype
        Target.prototype = new F()
        Target.prototype.constructor = Target
        Target.prototype.uber = Origin
    }
})()