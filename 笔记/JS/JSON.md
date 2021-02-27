### `JSON数据解决了什么问题`

### `JSON相关API`
JSON.stringify：
```js
const data = {name:'tom',age:18,like:{running:true,swimming:false}}
JSON.stringify(data,null,2) //{"name": "tom","age": 18,"like": {"running": true,"swimming": false}}
//第一个参数，可以是对象或数组
//第二个参数，要保留的属性
JSON.stringify(data,["name","age"],2) //{"name": "tom","age": 18}
JSON.stringify(data,["running"],2) //{}  只能识别第一层
JSON.stringify(data,["like"],2) //{"like":{}}  只能识别第一层
//第三个参数，teb资源位，及占位符空格数
```
JSON.parse：
```js
const data = {name:'tom',age:18,like:{running:true,swimming:false}}
let json = JSON.stringify(data,null,2) //{"name": "tom","age": 18,"like": {"running": true,"swimming": false}}
let obj = JSON.parse(json,(key,value)=>{
  console.log(key)//name, age, like, running, swimming
  console.log(value)//tom, 18, true, false
  return value
})
console.log(obj) //{name:'tom',age:18,like:{running:true,swimming:false}}
```

### `自定义toJSON`
```js
const data = {
  name:'tom',
  age:18,
  toJSON: function(){
    return {
      name: this.name
    }
  }
}
JSON.stringify(data) //{"name": "tom"}
```
