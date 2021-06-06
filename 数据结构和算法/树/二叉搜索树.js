function BinarySearchTree(){
  //声明Node类来表示树中的每个节点
  var Node = function(key){
    //键是相关术语中对节点的称呼
    this.key = key;
    this.left = null;
    this.right = null;
  };
  //使用root表示根元素
  var root = null;

  //插入节点的实现步骤
  //(1)如果树非空，需要找到插入新节点的位置
  //(2)如果新节点的键小于当前节点的键，那么需要检查当前节点的左侧子节点，
  //如果他没有左侧子节点，就在那里插入新的节点，如果有左侧子节点，需要通过递归调用insertNode方法继续找到树的下一层
  //(3)如果节点的键比当前节点的键大，同时当前节点没有右侧子节点，就在那里插入新的节点，
  //如果有右侧子节点，同样需要递归调用insertNode方法，但是要用来和新节点比较的节点将会是右侧子节点
  
         
  //向树中插入一个新的键
  this.insert = function(key) {
    var newNode = new Node(key);
    var insertNode = function(node,newNode){
      if(newNode.key < node.key){
        if (node.left === null) {
          node.left = newNode
        } else {
          insertNode(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode)
        }
      }
    }
    if (root === null) {
      root = newNode
    } else {
      insertNode(root,newNode);
    }
  }

  //在树中查找下一个键，如果节点存在，则返回true，如果不存在，则返回false
  

  //通过中序遍历方式遍历所有节点
  this.inOrderTraverse = function (callback) {
    var inOrderTraverseNode = function (node, callback) {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key)
        inOrderTraverseNode(node.right, callback)
      }
    }
    inOrderTraverseNode(root, callback)
  }

  //通过先序遍历方式遍历所有节点
  this.preOrderTraverse = function(callback){
    var preOrderTraverseNode = function(node, callback){
      if (node !== null) {
        callback(node.key)
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback)
      }
    }
    preOrderTraverseNode(root, callback)
  }

  //通过后序遍历方式遍历所有节点
  this.postOrderTraverse = function(callback){
    var postOrderTraverseNode = function(node, callback){
      if (node !== null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }
    postOrderTraverseNode(root, callback)
  }

  //返回树中最小的值/键
  this.min = function() {
    var minNode = function(node){
      if(node){
        while (node && node.left !== null) {
          node = node.left
        }
        return node.key
      }
      return null
    }
    return minNode(root)
  }
  //返回树中最大的值/键
  this.min = function() {
    var minNode = function(node){
      if(node){
        while (node && node.right !== null) {
          node = node.right
        }
        return node.key
      }
      return null
    }
    return minNode(root)
  }
  //从树中移除某个键
  this.remove = function(key){
    var findMinNode = function(node){
      while (node && node.left !== null) {
        node = node.left
      }
      return node
    }
    var removeNode = function(node, key){
      if (node === null) {
        return null
      }
      if (key < node.key) {
        node.left = removeNode(node.left, key)
        return node
      } else if (key > node.key) {
        node.right = removeNode(node.right, key)
        return node
      } else {//键等于node.key
        //第一种情况：一个叶节点
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
        //第二种情况：一个只有子节点的节点
        if (node.left === null) {
          node = node.right;
          return node
        } else if (node.right === null) {
          node = node.left;
          return node
        }
        //第三种情况：一个有两个子节点的节点
        var aux = findMinNode(node.right);
        node.key = aux.key;
        node.right = removeNode(node.right, aux.key);
        return node
      }
    }
    root = removeNode(root, key);
  }
}