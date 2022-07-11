// 什么时候不能使用箭头函数
// 1. 对象方法中，不适用箭头函数
const obj = {
    name: '张三',
    getName() {
        return this.name
    },
    getName1: () => {
        return this.name
    }
}
console.log('普通函数',obj.getName())   //'张三'
console.log('箭头函数',obj.getName1())  //'undefined'
// 2. 原型方法中，不适用箭头函数
obj = {
    name: '张三',
}
obj.__proto__.getName = function() {
    return this.name
}
obj.__proto__.getName1 = () => {
    return this.name
}
// 3. 构造函数中，也不行
function Foo (name, sex) {
    this.name = name
    this.sex = sex
}
const Foo1 = (name, sex) => {
    this.name = name
    this.sex = sex
}
console.log('普通的构造函数：', new Foo('张三', '男'))
console.log('箭头函数：', new Foo1('张三', '男'))   //会报错，它甚至不是一个构造函数
// 解释：
// 构造函数是通过 new 关键字来生成对象实例，生成对象实例的过程也是通过构造函数给实例绑定 this 的过程，而箭头函数没有自己的 this。因此不能使用箭头作为构造函数，也就不能通过 new 操作符来调用箭头函数。

// 4. 动态上下文中的回调函数
const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
    this.innerHTML = 'clicked'
})
// 箭头函数的 this 指向的是他的父作用域（这里就指向了 window），而不是指向这个button。这时候我们需要使用普通函数才可以。

// 5. Vue 生命周期和 method 中也不能使用箭头函数
// react行，因为VUe组建本质上是一个JS对象；React组件本质上是一个ES6的class，两者有区别
