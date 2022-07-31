// 函数柯里化
//1. currying必须通过闭包实现变量私有化，并保存后续接收的变量到一个数组中，否则它就无法在接收到第四个参数是返回sum值
//2. currying的返回值为一个函数
//3. currying返回的函数在被调用完成后要么返回结果、要么还是返回一个函数
const currying = (fn)=>{
    let arr = []   //满足1
    let inner = (...args)=>{
      arr.push(...args)    //满足1
      //console.log(arr)     //调试
      return arr.length >= fn.length ? fn(...arr) : inner    //满足3
    }
    return inner//满足2
}

// 用例1：sum()
const sum = (a, b, c, d)=>{
    return a+b+c+d
}
console.log(currying(sum)(1,2,3,4))
console.log(currying(sum)(1)(2,3)(4))

// 用例2: 类型判断
const isType = (type, value)=>{
    return Object.prototype.toString.call(value) == `[object ${type}]`
}
console.log(currying(isType)("Array")([]))      // true
console.log(currying(isType)("Array")(1))       // false
console.log(currying(isType)("Number")(1))      // true
console.log(currying(isType)("Number")('1'))    // false
console.log(currying(isType)("String")('1'))    // true
console.log(currying(isType)("String")(1))      // false
console.log(currying(isType)("Boolean")(true))  // true
console.log(currying(isType)("Boolean")(1))     // false
