
### `axios的优点`
* 从浏览器中创建 XMLHttpRequest
* 从 node.js 发出 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换JSON数据
* 客户端支持防止CSRF/XSRF
* 提供了一些并发请求的接口（重要，方便了很多的操作）
<br>
注：防止CSRF:就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

### `fetch的优点`
* 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
* 更好更方便的写法
* 更加底层，提供的API丰富（request, response）
* 脱离了XHR，是ES规范里新的实现方式
### `fetch的缺点`
* fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
* fetch默认不会带cookie，需要添加配置项
* fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
* fetch没有办法原生监测请求的进度，而XHR可以