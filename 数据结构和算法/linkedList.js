/**
 *链表:存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的，每一个元素由一个存储元素本身的节点和指向下一个元素的引用组成
 *数组可以访问任何位置的任何元素，而想要访问链表中间的一个元素，需要从七点开始迭代列表直到找到所需的元素
 * 
 */
function LinkedList() {
  //辅助类，表示要加入列表的项，element：要添加到列表的值，next：指向列表中下一个节点项的指针
  let Node = function(element) {
    this.element = element;
    this.next = null;
  }
  let length = 0; //列表项
  let head = null; //第一个节点的引用
  //向列表尾部添加一个新的项
  this.append = function(element) {
    let node = new Node(element),current //即let node = new Node(element); let current
    if (head === null) {
      head = node
    } else {
      current = head
      //循环列表，直到找到最后一项
      while(current.next) {
        current = current.next
      }
      //找到最后一项，将其next赋为node，建立链接
      current.next = node
    }
    length++;
  }
  //向列表的特定位置插入一个新的项
  this.insert = function(position, element) {
    
  }
  //从列表的特定位置移除一项
  this.removeAt = function(position) {}
  //从列表中移除一项
  this.remove = function(element) {}
  //返回元素在列表中的索引，如果列表中没有该元素则返回-1
  this.indexOf = function(element) {}
  //如果链表中不包含任何元素，返回true，如果链表长度大于0返回false
  this.isEmpty = function() {}
  //返回链表包含的元素个数
  this.size = function() {}
  this.getHead = function() {}
  //由于列表项使用了Node类，需要重写toString方法，让其只输出元素的值
  this.toString = function() {}
  this.print = function() {}
}