function ArrayList() {
  var array = [3,5,4,1];
  var swap = function(array,index1,index2){
    [array[index1],array[index2]] = [array[index2],array[index1]];
  }
  this.insert = function(item){
    array.push(item)
  }
  this.toString  = function(){
    return array.join();
  }
  //冒泡排序
  this.bubbleSort = function(){
    var length = array.length;
    for(var i = 0; i < length; i++) {
      for(var j = 0; j < length-1-i; j++) {
        if (array[j] > array[j+1]) {
          swap(array, j, j+1);
          console.log(array);
        }
      }
    }
  }
  //选择排序(找数据结构中最小的值放在第一位，接着找第二小的值放在第二位，以此类推)
  this.selectionSort = function(){
    var length = array.length,indexMin;
    for(var i = 0; i < length - 1; i++) {
      indexMin = i;
      for(var j = i; j < length; j++){
        if (array[indexMin] > array[j]) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        swap(i, indexMin)
      }
    }
  }
  //插入排序(插入排序每次排一个数组项，以此方式构建最后的排序数组)
  this.insertionSort = function(){
    var length = array.length,j,temp;
    for(var i = 1; i < length; i++) {
      j = i;
      temp = array[i];
      while(j>0 && array[j-1] > temp) {
        array[j] = array[j-1];
        j--;
      }
      array[j] = temp;
    }
  }

  //归并排序(归并排序是一种分治算法，其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组)
  this.mergeSort = function(){
    var merge = function(left, right) {
      var result = [],il = 0,ir=0;
      while(il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
          result.push(left[il++])
        } else {
          result.push(right[ir++])
        }
      }
      while(il<left.length){
        result.push(left[il+1])
      }
      while(ir < right.length) {
        result.push(right[ir++])
      }
      return result;
    }
    var mergeSortRec = function(array){
      var length = array.length;
      if(length === 1) {
        return array
      }
      var mid = Math.floor(length / 2),
      left = array.slice(0, mid),
      right = array.slice(mid, length);
      return merge(mergeSortRec(left),mergeSortRec(right));
    }
    array = mergeSortRec(array)
  }

  //快速排序
  //(1)从数组中选择中间一项作为主元
  //(2)创建两个指针，左边一个指向数组第一项右边一个指向数组最后一项，移动左指针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，
  //然后交换他们，重复这个过程，直到左指针超过了右指针，这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后，这一步叫划分操作
  //(3)接着，算法对划分后的小数组重复之前的两个步骤，直至数组已完全排序。
  this.quickSort = function(){
    var partition = function(array, left, right) {
      var pivot =array[Math.floor((right + left) / 2)],
      i = left,
      j = right;
      while(i <= j) {
        while(array[i] < pivot) {
          i++
        }
        while(array[j] > pivot) {
          j--
        }
        if (i <= j) {
          swap(array,i,j);
          i++;
          j--;
        }
      }
      return i
    }
    var quick = function(array, left, right) {
      var index;
      if (array.length > 1) {
        index = partition(array,left,right);
        if (left < index - 1) {
          quick(array, left, index - 1)
        }
        if (index < right) {
          quick(array, index, right)
        }
      }
    }
    quick(array,0,array.length - 1)
  }

  //堆排序(吧数组当作二叉树来处理，索引0是树的根节点，除根节点外，任意节点N的父节点是N/2，节点L的左子节点是2*L，节点R的右子节点是2*R+1)
  this.heapSort = function(){
    var heapSize = array.length;
    var heapify = function(array,heapSize,i){
      var left = i * 2 + 1,
      right = i * 2 + 2,
      largest = i;
      if (left < heapSize && array[left] > array[largest]) {
        largest = left
      }
      if (right < heapSize && array[right] > array[largest]) {
        largest = right
      }
      if (largest !== i) {
        swap(array, i, largest);
        heapSize(array, heapSize, largest)
      }
    }
    var buildHeap = function(array){
      var heapSize = array.length;
      for(var i = Math.floor(array.length / 2);i>=0;i++){
        heapify(array,heapSize,i)
      }
    }
    buildHeap(array);
    while(heapSize > 1) {
      heapSize--;
      swap(array,0,heapSize);
      heapify(array,heapSize,0)
    }
  }
}