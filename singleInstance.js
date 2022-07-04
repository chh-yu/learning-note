// 模拟new操作符创建对象
// function initFunction(fn, ...params) {
//     var obj = Object.create(fn.prototype);
//     var resultOfFn = fn.apply(obj, params);
//     return isPermitive(resultOfFn) ? obj : resultOfFn;  // isPermitive函数用于判断是否为基本类型
// }
// const me = initFunction(Person, 'zjh');
// （1）创建一个新的对象，并指定fn.prototype作为该对象的原型对象（新对象能够 “继承” fn.prototype对象所处原型链上的所有属性和方法）；
// （2）指定函数fn的执行作用域为新创建的对象，并传入函数对应的初始化参数，然后获取其返回值（这一步实际上包含两层含义：1. 指定函数fn的this指向新对象，执行fn，将初始化属性绑定到this上  2. 获取函数fn执行的返回值）。
// （3）若函数fn的返回值是对象，那么使用该对象作为new的结果返回；否则返回（1）中新创建的对象。
// ————————————————
// 版权声明：本文为CSDN博主「KarmaGut」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/z372574152/article/details/105915007

var singleInstance = function(){
    var instance = null;
    return function(a, b){
        this.a = a
        this.b = b
        if(instance !== null){
            return instance
        }
        instance = this
    }
}()

var obj1 = new singleInstance(10, 20)
var obj2 = new singleInstance(100, 200)

console.log(obj1)
console.log(obj2)
