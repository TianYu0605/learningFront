### `异步加载图片体验体验js任务操作`
```js
function loadImg(src,resolve,reject) {
  let image = new Image();
  console.dir(image);
  image.src = src;
  image.onload = () => resolve(image),
  image.onerror = reject;
}
loadImg(
  'img/a.png',
  image=>document.body.append(image),
  () => console.log('加载失败！')
)
```
### `定时器的任务轮询`
```html
<div style="width: 300px;height: 300px;background-color: blue;position: relative;"></div>
<script>
  "use strict"
  window.onload = function () {
    function interval(callback, delay = 100) {
      let id = setInterval(()=>callback(id),delay)
    }
    interval((timeId)=>{
      const div = document.querySelector('div');
      let left = parseInt(window.getComputedStyle(div).left)
      div.style.left = left + 10 + 'px';
      if (left >= 200) {
        clearInterval(timeId)
      }
    })
  }
</script>
```
### `通过文件依赖了解任务排序`
```js
function load(src, resolve) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = resolve;
  document.body.appendChild(script)
}
```

### `Ajax异步请求任务管理`
```js
function ajax(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function(){
    if (this.status === 200) {
      callback(JSON.parse(this.response))
    } else {
      throw new Error('加载失败！')
    }
  }
}
```

### `Promise微任务处理机制`
```js
//new的时候是准备状态
new Promise((resolve, reject)=>{
  resolve('操作成功！')
})//then是执行完之后要做的事
.then(
  value => {console.log(value);},
  reason => {console.log(reason);}
)
```
### `宏任务与微任务执行顺序`
```js
//#0
setTimeout(() => {
  console.log('setTimeout');
}, 0);
//#1
new Promise(resolve => {
  //#2
  resolve()
  console.log('promise');
})
//#3
.then(value=>console.log('成功'))
//#4
console.log('执行完毕');
//依次打印 promise  执行完毕  成功  setTimeout 
//#1和#4是同步任务，依次执行，到#2是异步任务，#3会被加入到微任务队列，#2执行完毕返回值后执行#3
//#0是宏任务，同步和微任务执行完毕后执行微任务
```
### `宏任务的提升原来是误解`
```js
new Promise(resolve => {
  setTimeout(() => { //创建宏任务
    console.log('setTimeout1');
    resolve() //创建微任务
    console.log('setTimeout2');
  }, 0);
  console.log('promise');
})
.then(value=>console.log('成功'))
console.log('执行完毕');
//依次打印 promise  执行完毕 setTimeout1  setTimeout2  成功 
//这段代码中，宏任务执行后才创建微任务（宏任务不执行，微任务就无法生成）
//主线程执行完之后，才会去轮询微任务，然后去轮询宏任务
```

### `Promise单一状态与状态中转`
promise有三种状态：
* pending ：准备状态
* fulfilled ：已完成
* rejected ：已失败
状态一旦改变，无法可逆

### `Promise.then的用法`
```js
//示例1
new Promise((resolve,reject)=>{
  reject('reject')
})
.then(null,error=>console.log(error)) //.then会一直向下传递,then也会返回一个promise
.then(value=>console.log('then2',value),error=>error)  //then2 undefined
//示例2  then是对上一个promise的处理
new Promise((resolve,reject)=>{
  reject('reject')
})
.then(value=>value,error=>error) //error reject
.then(value=>console.log('value',value),error=>console.log('error',error)) //value reject
```

### `其他类型的Promise封装`

### `使用Promise封装AJAX异步请求`

### `Promise多种错误监测与catch使用`

### `自定义错误处理`

### `使用finally实现异步加载动画`

### `Promise异步加载图片`

### `封装setTimeout定时器`

### `构建扁平化的setInterval`

### `script脚本的Promise加载引擎`

### `Promise.resolve缓存后台数据`


### `Promise.reject使用`


### `Promise.all批量获取数据`


### `Promise.allSettled的使用`


### `Promise.race后台请求超时处理`

### `Promise队列原理`

### `使用Map实现Promise队列`

### `reduce封装Promise队列`

### `使用队列渲染数据`

### `async与await语法糖`

### `async延时函数`


### `await制作加载进度条`


### `class与await的结合`


### `异步封装在类内部`


### `async与await多种声明`


### `async基本错误处理`


### `标准的await错误处理流程`


### `await并行执行技巧`




