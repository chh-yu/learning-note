/* 1、实现一个observer */
{
    function defineReactive(data, key, val) {
        observe(val); // 递归遍历所有子属性
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                // val是defineRactive函数内的变量，return val后实现闭包，val变为私有变量
                return val;
            },
            set: function(newVal) {
                val = newVal;
                console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            }
        });
    }
     
    function observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(function(key) {
            defineReactive(data, key, data[key]);
        });
    };
     
    var library = {
        book1: {
            name: ''
        },
        book2: ''
    };
    var book = "你不知道的javascript"
    observe(library);
    observe(book)
    library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
    library.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
    console.log(library.book1.name)
}
/* 2、在observer中植入订阅器 */
{
    function defineReactive(data, key, val) {
        observe(val); // 递归遍历所有子属性
        var dep = new Dep() //对每一个变量都要建一个Dep的实例来收集这个变量的订阅者
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if('是否需要添加订阅者') {
                    dep.addSub(watcher); // 在这里添加一个订阅者
                }
                // val是defineRactive函数内的变量，return val后实现闭包，val变为私有变量
                return val;
            },
            set: function(newVal) {
                if(val === newVal) return
                val = newVal
                dep.notify() // 如果数据变化，通知所有订阅者
                console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            }
        });
    }
     
    function observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(function(key) {
            defineReactive(data, key, data[key]);
        });
    };
    function Dep(){
        this.subs = []
    }
    Dep.prototype = {
        addsubs: function(sub){
            this.subs.push(sub)
        },
        notify: function(){
            this.subs.forEach(function(sub){
                sub.update()
            })
        }
    }
}
/* 3、实现watcher */
{
    function defineReactive(data, key, val) {
        observe(val); // 递归遍历所有子属性
        var dep = new Dep() //对每一个变量都要建一个Dep的实例来收集这个变量的订阅者
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if(Dep.target) {
                    dep.addSub(Dep.target); // 在这里添加一个订阅者
                }
                // val是defineRactive函数内的变量，return val后实现闭包，val变为私有变量
                return val;
            },
            set: function(newVal) {
                if(val === newVal) return
                val = newVal
                dep.notify() // 如果数据变化，通知所有订阅者
                console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            }
        });
    }
     
    function observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(function(key) {
            defineReactive(data, key, data[key]);
        });
    };
    function Dep(){
        this.subs = []
    }
    Dep.target = null
    Dep.prototype = {
        addsubs: function(sub){
            this.subs.push(sub)
        },
        notify: function(){
            this.subs.forEach(function(sub){
                sub.update()
            })
        }
    }
    function Watcher(vm, exp, cb) {
        this.cb = cb;
        this.vm = vm;
        this.exp = exp;
        this.value = this.get();  // 将自己添加到订阅器的操作
    }
     
    Watcher.prototype = {
        update: function() {
            this.run();
        },
        run: function() {
            var value = this.vm.data[this.exp];
            var oldVal = this.value;
            if (value !== oldVal) {
                this.value = value;
                this.cb.call(this.vm, value, oldVal);
            }
        },
        get: function() {
            Dep.target = this;  // 缓存自己
            var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
            Dep.target = null;  // 释放自己
            return value;
        }
    };
    function SelfVue (data, el, exp) {
        this.data = data;
        observe(data);
        el.innerHTML = this.data[exp];  // 初始化模板数据的值
        new Watcher(this, exp, function (value) {
            el.innerHTML = value;
        });
        return this;
    }
    // 将vue的data里所有属性绑定到vue对象的属性
    function SelfVue (data, el, exp) {
        var self = this;
        this.data = data;
     
        Object.keys(data).forEach(function(key) {
            self.proxyKeys(key);  // 绑定代理属性
        });
     
        observe(data);
        el.innerHTML = this.data[exp];  // 初始化模板数据的值
        new Watcher(this, exp, function (value) {
            el.innerHTML = value;
        });
        return this;
    }
     
    SelfVue.prototype = {
        proxyKeys: function (key) {
            var self = this;
            Object.defineProperty(this, key, {
                enumerable: false,
                configurable: true,
                get: function proxyGetter() {
                    return self.data[key];
                },
                set: function proxySetter(newVal) {
                    self.data[key] = newVal;
                }
            });
        }
    }
    var ele = document.querySelector('#name');
    var selfVue = new SelfVue({
        name: 'hello world'
    }, ele, 'name');
 
    window.setTimeout(function () {
        console.log('name值改变了');
        selfVue.data.name = 'canfoo';
    }, 2000);
    
}
/* 4、实现Compile */
{
    /*
    虽然上面已经实现了一个双向数据绑定的例子，但是整个过程都没有去解析dom节点，而是直接固定某个节点进行替换数据的，所以接下来需要实现一个解析器Compile来做解析和绑定工作。解析器Compile实现步骤：
    1.解析模板指令，并替换模板数据，初始化视图
    2.将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器
    为了解析模板，首先需要获取到dom元素，然后对含有dom元素上含有指令的节点进行处理，因此这个环节需要对dom操作比较频繁，所有可以先建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理：
    */
    function nodeToFragment (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    }
    /*
    接下来需要遍历各个节点，对含有相关指定的节点进行特殊处理，这里咱们先处理最简单的情况，只对带有 '{{变量}}' 这种形式的指令进行处理，先简道难嘛，后面再考虑更多指令情况：
    */
    function compileElement (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
     
            if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
                self.compileText(node, reg.exec(text)[1]);
            }
     
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);  // 继续递归遍历子节点
            }
        });
    }
    function compileText (node, exp) {
        var self = this;
        var initText = this.vm[exp];
        updateText(node, initText);  // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, function (value) {  // 生成订阅器并绑定更新函数
            self.updateText(node, value);
        });
    }
    function updateText (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    /*
    获取到最外层节点后，调用compileElement函数，对所有子节点进行判断，如果节点是文本节点且匹配{{}}这种形式指令的节点就开始进行编译处理，编译处理首先需要初始化视图数据，对应上面所说的步骤1，接下去需要生成一个并绑定更新函数的订阅器，对应上面所说的步骤2。这样就完成指令的解析、初始化、编译三个过程，一个解析器Compile也就可以正常的工作了。为了将解析器Compile与监听器Observer和订阅者Watcher关联起来，我们需要再修改一下类SelfVue函数：
    */
    function SelfVue (options) {
        var self = this;
        this.vm = this;
        this.data = options;
     
        Object.keys(this.data).forEach(function(key) {
            self.proxyKeys(key);
        });
     
        observe(this.data);
        new Compile(options, this.vm);
        return this;
    }
    /*
    更改后，我们就不要像之前通过传入固定的元素值进行双向绑定了，可以随便命名各种变量进行双向绑定了：
    */
    var selfVue = new SelfVue({
        el: '#app',
        data: {
            title: 'hello world',
            name: ''
        }
    });
 
    window.setTimeout(function () {
        selfVue.title = '你好';
    }, 2000);
 
    window.setTimeout(function () {
        selfVue.name = 'canfoo';
    }, 2500);
    /*
    到这里，一个数据双向绑定功能已经基本完成了，接下去就是需要完善更多指令的解析编译，在哪里进行更多指令的处理呢？答案很明显，只要在上文说的compileElement函数加上对其他指令节点进行判断，然后遍历其所有属性，看是否有匹配的指令的属性，如果有的话，就对其进行解析编译。这里我们再添加一个v-model指令和事件指令的解析编译，对于这些节点我们使用函数compile进行解析处理：
    */
    function compile (node) {
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function(attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {  // 事件指令
                    self.compileEvent(node, self.vm, exp, dir);
                } else {  // v-model 指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    }
    /*
    上面的compile函数是挂载Compile原型上的，它首先遍历所有节点属性，然后再判断属性是否是指令属性，如果是的话再区分是哪种指令，再进行相应的处理，处理方法相对来说比较简单，这里就不再列出来
    最后我们在稍微改造下类SelfVue，使它更像vue的用法：
    */
    function SelfVue (options) {
        var self = this;
        this.data = options.data;
        this.methods = options.methods;
     
        Object.keys(this.data).forEach(function(key) {
            self.proxyKeys(key);
        });
     
        observe(this.data);
        new Compile(options.el, this);
        options.mounted.call(this); // 所有事情处理好后执行mounted函数
    }
    //这时候我们可以来真正测试了，在页面上设置如下东西：
    new SelfVue({
        el: '#app',
        data: {
            title: 'hello world',
            name: 'canfoo'
        },
        methods: {
            clickMe: function () {
                this.title = 'hello world';
            }
        },
        mounted: function () {
            window.setTimeout(() => {
                this.title = '你好';
            }, 1000);
        }
    });
}