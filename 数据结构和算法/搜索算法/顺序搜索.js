function sequentialSearch(array,item){
  for (var i = 0; i< array.length; i++){
    if (item === array[i]) {
      return i
    }
  }
  return -1
}