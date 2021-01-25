### `cookie验证和token验证的区别`

### `针对单个文件添加eslint`
在js文件顶部添加注释 `/* eslint-disable */` 即可

### `math函数应掌握的方法`
Math.abs(x): 返回x的绝对值<br>
Math.exp(x): 返回Math.E的x次幂<br>
Math.expm1(x): 等于Math.exp(x) - 1<br>
Math.log(x): 返回x的自然对数<br>
Math.log1p(x): 等于 1 + Math.log(x)<br>
Math.pow(x,power): 返回x的power次幂<br>
Math.hypot(...nums): 返回nums中每个数平方和的平方根<br>
Math.clz32(x): 返回32位整数x的前置零的数量<br>
Math.sign(x): 返回表示x符号的1、0、-0、-1<br>
Math.trunc(x): 返回x的整数部分，删除所有小数<br>
Math.aqrt(x): 返回x的平方根<br>
Math.cbrt(x): 返回x的立方根<br>
Math.acos(x): 返回x的反余弦<br>
Math.acosh(x): 返回x的反双曲余弦<br>
Math.asin(x): 返回x的反正弦<br>
Math.asinh(x): 返回x的反双曲正弦<br>
Math.atan(x): 返回x的反正切<br>
Math.atanh(x): 返回x的反双曲正切<br>
Math.atan2(y,x): 返回y/x的反正切<br>
Math.min(1,2,3,4): 返回最小值，改方法只支持传多参数
```
Math.min.apply(null,[1,2,3,4])//使用Math.min获取数组的最小值，Math.max同理 
```
Math.ceil(): 向上取整 Math.ceil(5.1) //6
Math.floor(): 向下取整 Math.floor(5.1)  //5
Math.round(); 四舍五入取整
Math.random(): 获取从0到1之间的数字，包含0但不包含1
```
Math.floor(Math.random()*(a+1)) //获取 0 - a(整数，包括a)之间的值 
```

### `typeof的返回值有哪些`
typeof的返回值为字符串，包含string、number、boolean、object(包含对象、数组、null)、function、undefined、symbol

### `instanceof的使用`
instanceof可以区分object类型为对象还是数组，如区分数组
```
let a = [], b = {};
console.log(a instanceof Array) //判断数组
console.log(b instanceof Object)  //判断对象
```
### `Object.freeze冻结变量`
```
const a = {name:'tom'}
Object.freeze(a) //将a冻结
a.name = 'jack' //a已被冻结，更改不生效，使用严格模式时该行会报错
console.log(a.name) //tom
```
### `短路运算的使用`
```
let x = prompt('请输入')||'保密'  //如果用户输入了，x的值为输入的值，没输入则x值为保密。
```

### `switch也可以这样使用`
```
function getType(age) {
  let message = ''
  switch(true){
    case age>60: message = '老年';break
    case age>40: message = '中年';break
    case age>20: message = '青年';break
    default: message = '少年'
  }
  return message
}
```
### `document.write()覆盖原文档问题`
onload 事件会在页面或图像加载完成后立即发生。页面加载完后文档流已关闭，这时再使用document.write()写内容就会将原来页面的内容覆盖。
write 方法用于向文档流中写入内容。当文档在加载的时候，文档流是可写的，所以就不用调用open(),close()方法来打开和关闭输出流。当文档加载完毕过后，文档流是不可写的，要write内容就得先打开输出流，通过调用open()打开，这个open()方法则会清除当前文档（通常open()方法会在调用write时自动调用）。
解决方法：可以先获取一个div，把document.write要写的内容通过.innerHTML()来插入
参考：[https://blog.csdn.net/zlj526/article/details/49246589](https://blog.csdn.net/zlj526/article/details/49246589)

### `break、contiune、return`
break: 终止整个循环
continue:跳过当次循环，执行下一次循环
return: 只用于函数体内，终止函数运行

### `continue与标签的使用`
```
var num=0;
outter:                         //label语句，名字可自定义
for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        if(i==5&&j==5){
            break ;             //跳出当前循环，但会继续执行外循环
        }
        num++;
    }
}
document.write(num);   //95
```
```
var num=0;
outter:
for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        if(i==5&&j==5){
            break outter;    //退出内部循环，指向outter，即外循环，同时退出外循环
        }
        num++;
    }
}
document.write(num);   //55
```
```
var num=0;
outter:
for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        if(i==5&&j==5){
            continue;    //当i==5&&j==5时，内循环退出一次
        }
        num++;
    }
}
document.write(num);     //99
```
```
var num=0;
outter:
for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        if(i==5&&j==5){
            continue outter;  //强制退出内部循环，执行外部循环，和 例子1 一样
        }
        num++;
    }
}
document.write(num);   //95
```

### `字符串的常用函数`
1. toUpperCaes(): 将字母转换为大写
2. toLowerCase(): 将字母转化为小写
3. trim(): 去除空格
4. chatAt(0): 获取第0个字符串
5. slice(a,b): 截取字符串，a:开始位置，为负则倒着截，b:截取位置(不包括b) 如：a.slice(-3,-1):从倒数第三个截到倒数第一个
6. substr(): 截取字符串，a:开始位置（取负值时与slice相同），b:截取的个数
7. substring(): 截取字符串，a:开始位置（不能为负值，为负值会从头开始截），b:截取位置(不包括b)，a,b都取负值相当于从0截到0，结果为空字符串
8. indexOf('a',8): 从左边第8个字符开始查字符串中'a'的位置，返回所在位置的索引，没有则返回-1,同时适用于数组
9. lastIndexOf('a',8): 从右边第8个字符开始查字符串中'a'的位置，返回所在位置的索引，没有则返回-1,同时适用于数组
10. includes('a',8): 从左边第8()个开始查找字符串中是否包含'a' ，返回布尔值
11. startsWith('a'): 字符串是否以a为开头
12. endsWith('a'): 字符串是否以a结尾
13. replace(): 字符串替换`let a = 'abcd.com';a.replace('bcd','s') //a变为as.com`
14. repeat(): 重复字符串`'abc'.repeat(3)//让字符串‘abc’重复三次`
15. split(''): 将字符串拆分成数组 Array.from(str)也可以将字符串拆成数组

### `类型转换使用技巧`
```
const a = '88'; a*1+1 //值为89，字符串与数字做乘除时会隐式的将字符串转化为数字后做乘除，若不乘1将会变成字符串拼接
const a = 88; a + ''//变成了字符串 
console.log(parseInt('99ssfgfd')) //99  console.log(parseInt('aaa99aaa'))  //NaN console.log(parseFloat('99.21aaa'))  //99.21
//Boolean类型转换原理(注意比较和转换时两件事情)
const a = true, b = 8;
a.valujeOf() //true
console.log(b == true) //false,此类判断会先将true或false转化为1或0然后再判断
if (b) {} //这里会进行隐式的转换，即if (Boolean(b)) {}
//对于Boolean(s) 若s为''、0、null、undefined、NaN时表达式值为假，s为空数组、空对象时也为真，因为数组时引用类型
let number = 0; number = !!number  //number变成了false
//Boolean实例的使用
while (true) {
    const password = prompt('请输入密码').trim()
    if (!password) continue
    console.log(password === '12345'?'密码正确':'密码错误');
    break
}
```
### `数值的常用函数`
1. toFixed(2): 四舍五入并保留两个小数位

### `日期的使用`


