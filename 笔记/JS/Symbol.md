### `Symbol的定义`
```js
//第一种
let sym1 = Symbol('test')//里面加描述来区分Symbol
let sym2 = Symbol('test')//
console.log(sym1 === sym2) //false
console.log(sym) // Symbol(discription)
console.log(sym.description) //test
//第二种
let sym1 = Symbol.for('test')
let sym2 = Symbol.for('test') //声明前会在系统中查是否有这个Symbol，有的话直接拿来用
let sym3 = Symbol.for('test2')
console.log(sym1 === sym2) //true
console.log(sym1 === sym3) //false
console.log(sym1.description) //test
console.log(Symbol.keyFor(sym1)) // test 使用Symbol.for()定义的Symbol，可以用Symbol.keyFor()获取描述
//以上两种定义Symbol的区别:
//第二种方式定义后，系统会在内存中进行记录，再声明相同描述的Symbol后会对之前已存在的进行复用，而第一种即使描述相同，两个也不是同一个Symbol
```

### `Symbol在缓存容器中的使用`
```js
class Cache {
  static data = {};
  static set(name, value) {
    return (this.data[name] = value)
  }
  static get(name) {
    return this.data[name]
  }
}
let user = {
  name: 'tom',
  age: 18,
  key: Symbol()
}
let person = {
  name: 'tom',
  sex: '男',
  key: Symbol()
}
Cache.set(user.key,user)
Cache.set(person.key,person)
console.log(Cache.get(user.key));//{name: "tom", age: 18, key: Symbol()}
console.log(Cache.get(person.key));//{name: "tom", sex: 18, key: Symbol()}
```

### `扩展特性与对象属性保护`
```js
const user = {name: 'tom',[Symbol()]: 18}
for (const key in user) {
  console.log(key);  // name  Symbol遍历不到，for of也是如此
}
for (const key of Object.getOwnPropertySymbols(user)) {
  console.log(key);  // Symbol()  只能遍历到Symbol
}
for (const key of Reflect.ownKeys(user)) {
  console.log(key);  // name Symbol()
}
//Symbol作为私有变量的应用
const decs = Symbol();
class User {
  constructor(name) {
    this.name = name;
    this[decs] = 'high'
  }
  getName(){
    return `${this[desc]}${this.name}`
  }
}
let user = new User('tom') 
console.log(user);// {name: "tom", Symbol(): "high"} //此时对user做遍历是访问不到Symbol的
```