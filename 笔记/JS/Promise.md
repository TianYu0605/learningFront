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