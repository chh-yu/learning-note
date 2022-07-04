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
