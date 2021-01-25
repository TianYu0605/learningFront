import './linkedList';
/**
 *hashMap也叫hashTable，实现三个基本方法
 *put(key,value):向散列表增加一个新的项（也能更新散列表）
 *remove(key):根据键值从散列表中移出值
 *get(key):返回根据键值检索到的特定值
 */
function HashTable() {
  var table = []
  //先实现散列函数
  var loseloseHashCode = function (key) {
    var hash = 0;
    for(var i = 0; i<key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37 //为了得到比较小的数值，我们使用hash值和一个任意数做除法的余数
  }
  this.put = function(key, value) {
    var position = loseloseHashCode(key);
    console.log(position+ '-' + key)
    table[position] = value
  }
  this.get = function(key) {
    return table[loseloseHashCode(key)]
  }
  this.remove = function(key) {
    table[loseloseHashCode(key)] = undefined
  }
}
//用上述方法实现的散列表会出现冲突（散列值的余数相同时会出现在同一位置，导致数据丢失）
//处理方法有分离链接、线性探查和双散列法
/**
 *分离链接法
 * 
 *
 */
function HashTableOne() {
  var table = []
  //先实现散列函数
  var loseloseHashCode = function (key) {
    var hash = 0;
    for(var i = 0; i<key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37 //为了得到比较小的数值，我们使用hash值和一个任意数做除法的余数
  }
  //辅助类，表示将要加入LinkedList实例的元素
  var ValuePair = function(key, value) {
    this.key = key
    this.value = value
    this.toString = function() {
      return '[' + this.key + '-' + this.value + ']'
    }
  }
  this.put = function(key, value) {
    var position = loseloseHashCode(key)
    if (table[position] === undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value))
  }
  this.get = function(key) {
    var position = loseloseHashCode(key)
    if(table[position] !== undefined) {
      var current = table[position].getHead();
      while(current.next){
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
      //检查元素在第一个或最后一个节点的情况
      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  } 
}
