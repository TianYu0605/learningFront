### `Date的使用`
```
const date = new Date(); 
console.log(date)  // Tue Jan 19 2021 22:24:42 GMT+0800 (中国标准时间)      date类型为object
console.log(date * 1) // 1611066521495  返回的是时间戳，即1970年0时0分0秒到当前系统时间经过的毫秒数（不同语言不一样）
const hd = Date(); console.log(hd)  //Tue Jan 19 2021 22:24:42 GMT+0800 (中国标准时间)     date类型为string
console.log(hd * 1) //NaN
console.log(Date.now())  //test.html:13 1611066791528 获取时间戳
```
```
let dateList = [2020,12,12,12,12,12];
const date = new Date("2020-12-12 12:12:12"); //别的写法：new Date(2020,12,12,12,12,12)  new Date(...dateList)
//上述写法date值都为 Sat Dec 12 2020 12:12:12 GMT+0800 (中国标准时间)
date.getFullYear();  // 2020 获取年份
date.getMonth();  // 11 获取月份
date.getDate(): // 获取日
date.getHours(): //  获取时
date.getMinutes(): // 获取分
date.getSeconds(): //  获取秒
```
### `查看运行时间的方法`
```
//第一种
console.time('flag') //flag就是一个标志，开始与结束标志一致即可
for (let i = 0; i< 200000000;i++) {}
console.timeEnd('flag')  //控制台输出：flag: 281.85791015625 ms
//第二种
const start = Date.now()
for (let i = 0; i< 200000000;i++) {}
const end = Date.now()
console.log(end-start);
```
### `类型转换`
```
const date = new Date(); const timestamp = date*1;
//日期 => 时间戳
date*1 | Number(date) | date.valueOf() | date.valueOf() | date.getTime()
//时间戳 => 日期
new Date(timestamp)
```
### `自封装一个日期函数`
```
const date = new Date();
function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth()+1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  }
  for(const key in config) {
    format = format.replace(key,config[key])
  }
  return format
}
```
### `moment.js的使用`


