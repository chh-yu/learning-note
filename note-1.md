### 页面为什么会出现乱码？
文字是。。。，编码没有设置对，计算机读取到时，可能编码错误导致乱码
### 学了多久？
### 重点学习内容？
### js基本数据类型（6种）?
number string boolean object null undefined 
### 如何判断数据类型？
typeof()
只能判断简单的数据类型(number, string, object, undefined, function)
### 复杂数据类型判断？原理？
A instanceof B
判断A的原型链上是否有B
### null会等于true吗？
null == true为false
### 如何判断一个对象为空？
1. 用for in遍历对象
2. JSON对象的stringify方法将对象转化为字符串
`JSON.stringify(obj)`是否等于`'{}'`
3. 利用ES6中`Object.keys()`来进行判断 （推荐）
`Object.keys()`方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
如果我们的对象为空，他会返回一个空数组。
`Object.keys(obj).length === 0 ? '空' : '不为空'`
### 深拷贝浅拷贝？
递归实现
### js 实现sleep函数？
sleep函数作用是让线程休眠，等到指定时间在重新唤起。
1. 写一个循环，结束循环的条件是时间已经到了指定时间之后
利用Date对象： `new Date().getTime()`
2. 定时器实现
3. promise实现
### js 事件循环机制？
### 项目中遇到的问题?
### 正向代理和反向代理
虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间，所做的事情也都是把客户端的请求转发给服务器，再把服务器的响应转发给客户端，但是二者之间还是有一定的差异的。
1. 正向代理其实是客户端的代理，帮助客户端访问其无法访问的服务器资源。反向代理则是服务器的代理，帮助服务器做负载均衡，安全防护等。
2. 正向代理一般是客户端架设的，比如在自己的机器上安装一个代理软件。而反向代理一般是服务器架设的，比如在自己的机器集群中部署一个反向代理服务器。
3. 正向代理中，服务器不知道真正的客户端到底是谁，以为访问自己的就是真实的客户端。而在反向代理中，客户端不知道真正的服务器是谁，以为自己访问的就是真实的服务器。
4. 正向代理和反向代理的作用和目的不同。正向代理主要是用来解决访问限制问题。而反向代理则是提供负载均衡、安全防护等作用。二者均能提高访问速度。
### 防抖和节流？
1. 防抖（debounce）：所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
2. 节流（throttle）：所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
### html5有哪些新特性
语义化标签：header,footer,nav etc.
canvas 画布、audio, video、drag 拖拽、本地存储 localStorage, sessionStorage、webSocket 长连接、定位、增强型表单 input number, datalist, keygen, output, progress、svg 矢量绘图、webWorker 实现js多进程。
### css3
CSS3圆角 border-radius
盒阴影 box-shadow
边框图像 border-image
linear-gradient()：线性渐变。
。。。
### 如何理解web语义化
* 正确的标签做正确的事情
* 页面内容结构化
* 无CSS样子时也容易阅读，便于阅读维护和理解
* 便于浏览器、搜索引擎解析。 利于爬虫标记、利于SEO（Search Engine Optimization, 搜索引擎优化）
#### html语义化标签
HTML为网页文档内容提供上下文结构和含义。对于HTML体系而言，Web语义化是指使用语义恰当的标签，使页面有良好的结构，让页面元素有含义，便于被浏览器、搜索引擎解析、利于SEO。通常我们所说的HTML应该是完全脱离表现信息的，其中的标签应该都是语义化地定义了文档的结构。
html语义化标签包括 body, article, nav, aside, section, header, footer, hgroup, 还有 h1-h6 address等。
#### css语义化
CSS语义就是class和ID命名的语义。class属性作为HTML与CSS衔接的纽带，其本意是用来描述元素内容的。指用易于理解的名称对html标签附加的class或id命名。如果说HTML语义化标签是给机器看的，那么CSS命名的语义化就是给人看的。良好的CSS命名方式减少沟通调试成本，易于理解。
#### ARIA
ARIA即Accessible Rich Internet Application，中文译为无障碍富互联网应用。可以为一些有功能障碍（如听力，视力）的人群通过屏幕阅读器例如voiceover等，提供无障碍访问动态、可交互Web内容。
而应用于HTML的ARIA有两部分组成：role 和aria-*。
role标识了一个元素的作用，aria-描述了与之有关的事物特征及其状态。
W3C对ARIA无障碍Web规范这样解释：
Web developers may use the ARIA role and aria-* attributes on HTML elements, in accordance with the requirements described in [wai-aria-1.1], except where these conflict with the strong native semantics or are equal to the implicit ARIA semantics of a given HTML element.
>Setting an ARIA role and/or aria-* attribute that matches the implicit ARIA semantics is unnecessary and is not recommended as these properties are already set by the browser.
>
### src和href区别
#### href
href：Hypertext Reference的缩写，超文本引用，它指向一些网络资源，建立和当前元素或者说是本文档的链接关系。在加载它的时候，不会停止对当前文档的处理，浏览器会继续往下走。常用在a、link等标签。
```
<a href="http://www.baidu.com"></a>
<link type="text/css" rel="stylesheet" href="common.css">
```
 如上面所显示的那样，当浏览器加载到link标签时，会识别这是CSS文档，并行下载该CSS文档，但并不会停止对当前页面后续内容的加载。这也是不建议使用@import加载CSS的原因。
#### src
src：source的所写，表示的是对资源的引用，它指向的内容会嵌入到当前标签所在的位置。由于src的内容是页面必不可少的一部分，因此浏览器在解析src时会停下来对后续文档的处理，直到src的内容加载完毕。常用在script、img、iframe标签中，我们建议js文件放在HTML文档的最后面。如果js文件放在了head标签中，可以使用window.onload实现js的最后加载。
总结：href用于建立当前页面与引用资源之间的关系（链接），而src则会替换当前标签。遇到href，页面会并行加载后续内容；而src则不同，浏览器需要加载完毕src的内容才会继续往下走。
