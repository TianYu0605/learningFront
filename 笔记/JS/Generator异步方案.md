### `基本定义`

```js
function* foo () {
  console.log('test1');
  //暂停执行并向外返回值
  var s = yield 'next return data'//调用next后，返回对象值
  //注意，上面的代码分两次next
  console.log(s)
  console.log('end code')
}
//调用函数  不会立即执行，返回  生成器对象
const gener = foo();
//调用next方法，才会开始执行
//返回 包含yield 内容的对象
//每次调用next，会执行到yield后面的内容后停止
const yields = gener.next();
console.log(yields); //{value:'next return data',done:false}
//对象中done，表示生成器是否已经执行完毕
//对象中value是函数中yield的返回值
//函数中的代码并没有执行结束

//下一次的next方法调用，会从前面函数的yield后的代码开始执行

```