/**
 * 字典所能使用的方法
 * set(key,value):向字典中添加新元素
 * delete(key):通过使用键值来从字典中移除键值对应的数据值
 * has(key):如果某个键值存在于这个字典中，则返回true，反之则返回false
 * get(key):通过键值查找特定的数值并返回
 * clear():将这个字典中的所有元素全部删除
 * size():返回字典所包含的元素的数量
 * keys():将字典所包含的所有键名以数组形式返回
 * values():将字典所包含的所有数值以数组形式返回
 */
//构造函数写法
function Dictionary() {
  var items = {};
  this.has = function(key) {
    return key in items  //使用in操作符验证一个key是否是items对象的一个属性
  }
  this.set = function(key,value) {
    return items[key] = value
  }
  this.delete = function(key) {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }
  this.get = function(key) {
    return this.has(key) ? items[key] : undefined
  }
  this.values = function() {
    let list = []
    for (const key in items) {
      if (this.has(key)) {
        list.push(items[key])
      }
    }
    return list
  }
  this.clear = function() {
    items = {}
  }
  this.size = function() {
    return Object.keys(items).length
  }
  this.keys = function() {
    return Object.keys(items)
  }
  this.getItems = function() {
    return items
  }
}
//类写法
// class DictionaryInClass {

// }

