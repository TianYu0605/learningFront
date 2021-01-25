//函数柯里化

/**
 *打印杨辉三角
 * @param {number} [row=5] 行数
 */
function yangHui(row=5) {
  for (let i = 1; i < row; i++) {
    for(let n = row - i; n > 0 ; n--) {
      document.write('<span style="color:white"></span>')
    }
    for (let m = i*2 - 1; m > 0; m--) {
      document.write('*')
    }
    document.write('<br />')
  }
}

/**
 * 电话号中间四位模糊处理
 * @param {string|number} phone
 * @param {number} [len=4]
 */
function telphone(phone, len=4) {
  return String(phone).slice(0,3) + '*'.repeat(len) + String(phone).slice(7)
}

/**
 *实现数组元素的移动
 * @param {[]} array 要移动的数组
 * @param {number} from 元素原始位置
 * @param {number} to   元素目标位置
 */
function moveArray(array, from, to) {
  if (from < 0 || to >= array.length) {
    alert('参数错误！')
    return
  }
  const newArray = [...array];
  let item = newArray.splice(from, 1)
  newArray.splice(to, 0, ...item)
  return newArray
}