

function createElement(type, props, ...children) {
  delete props.__source
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextElement(child)
      })
    }
  }
}

/**
 *文本类型的虚拟dom创建
 *@param text 文本
 */
function createTextElement(text) {
  return {
    type: 'TEXT',
    props:{
      nodeValue: text,
      children: []
    }
  }
}

/**
 *
 *
 * @param {虚拟dom} vdom
 */
function createDom(vdom) {
  const dom = vdom.type === 'TEXT'?document.createTextNode('') : document.createElement(vdom.type)
  // Object.keys(vdom.props)
  //   .filter(key=>key !== 'children')
  //   .forEach(name =>{
  //     //@todo 事件处理，属性兼容
  //     dom[name] = vdom.props[name]
  //   })
  updateDom(dom,{},vdom.props)
  return dom
}

function updateDom(dom, prevProps, nextProps) {
  //1.规避children属性
  //2.老的存在，取消
  //3.新的存在，新增, 并没有做新老相等判定
  //@todo兼容性
  Object.keys(prevProps)
    .filter(name=>name!=='children')
    .filter(name=>!(name in nextProps))
    .forEach(name=>{
      if (name.slice(0, 2)==='on') {
        //onClick => click
        dom.removeEventListener(name, name.slice(0,2).toLowerCase(),prevProps[name],false)
      } else {
        dom[name] = ''
      }
    })
  Object.keys(nextProps)
    .filter(name=>name!=='children')
    .forEach(name=>{
      if (name.slice(0, 2)==='on') {
        //onClick => click
        dom.addEventListener(name, name.slice(0,2).toLowerCase(),prevProps[name],false)
      } else {
        dom[name] = nextProps[name]
      }
    })
}

function render(vdom, container) {
  /**
   * 打印下createElement的值看下
   * //被包围在 <pre> 标签 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体
   * JSON.stringify可以接收三个参数，参考：https://blog.csdn.net/weixin_43806733/article/details/107785893
   * container.innerHTML = `<pre>${JSON.stringify(vdom,null,2)}</pre>` 
   */
  
  // vdom.props.children.forEach(child => {
  //   render (child,dom)
  // })
  // container.appendChild(dom) 

  wipRoot = {
    dom: container,
    props: {
      children: [vdom]
    },
    base: currentRoot
  }
  delletions = []
  nextUnitOfWork = wipRoot
}

/**
 * 注意上面的render，一旦开始，无法停止，整个vdom过大时，diss过程也会因递归过多导致卡顿
 * 浏览器有一个api：requestIdleCallback，可以利用浏览器业余时间，可以把任务划分为一个一个
 * 的小片，利用浏览器空余时间来做diff，react自己实现了这个api，我们可以先用浏览器提供的的
 */

function commitRoot() {
  delletions.forEach(commitWorker) //每个delletions里面都是fiber的内容
  commitWorker(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function commitWorker(fiber) {
  if(!fiber) {
    return
  }
  //向上查找
  let domParentFiber = fiber.parent
  while(!domParentFiber) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
  // if (isBreakStatement.)
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber,domParent)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    //更新dom
    updateDom(fiber.dom, fiber.base.props, fiber.props)
  }
  
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}
//下一个单元任务
let nextUnitOfWork = null

let wipRoot = null

let currentRoot = null

let delletions = null
/**
* 调度我们的diff或渲染任务
*/
function workLoop(deadline) {
  //有下一个任务，并且当前帧还没有结束
  while(nextUnitOfWork && deadline.timeRemaining()>1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if (!nextUnitOfWork && wipRoot) {
    //没有任务了，并且根节点还在
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)
/**
 *fiber可以类比为一个数据结构，向火车一样可以分为一节一节
 *
 * @param {*} fiber
 */
function performUnitOfWork(fiber) {
  const isFunctionComponent  = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  
  //找下一个任务
  //先找子元素
  if (fiber.children) {
    return fiber.child
  }
  //没有子元素，就找兄弟元素
  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.slibing) {
      return nextFiber
    }
    //没有兄弟元素了，找父元素
    nextFiber = nextFiber.parent
  }
}
function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
function updateHostComponent(fiber) {
  //获取下一个任务
  //根据当前任务，获取下一个
  if (!fiber.dom) {
    //不是入口
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)
}
function reconcileChildren(wipFiber, elements){
  //构建fiber结构
  let index = 0
  let oldFiber = wipFiber.base && wipFiber.base.child
  let prevSlibing = null
  while(index<elements.length && oldFiber !== null) {
    let element = elements[1]
    let newFiber = {
      type: element.type,
      props: element.props,
      parent: wipFiber,
      dom: null
    }
    //对比oldFiber的状态和当前element
    //先比较类型
    const sameType = oldFiber && element && oldFiber.type === element.type

    if (sameType) {
      //复用节点，更新
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        base: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    if (!sameType && element) {
      //替换
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        base: null,
        effectTag: 'PLACEMENT'
      }
    }
    if(!sameType && oldFiber) {
      //删除
      oldFiber.effectTag = 'DELETION'
      delletions.push()
    }
    if (oldFiber) {
      oldFiber = oldFiber.slibing
    }
    if (index === 0) {
      //第一个元素，是fiber的child属性
      wipFiber.child = newFiber
    } else {
      //其他的是以
      prevSlibing.slibing = newFiber
    }
    prevSlibing = newFiber
    index++
    //fiber基本结构构建完毕
  }
}

/**
 *我们给dom添加节点的时候，如果渲染的过程中，被打断的，ui渲染会变得很奇怪
 *所以我们应该把dom操作独立出来，我们用一个全局变量来存储正在工作的fiber根节点
 *
 */
export default {
  createElement,
  render
}