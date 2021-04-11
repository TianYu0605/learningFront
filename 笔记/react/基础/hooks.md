### `useReducer`
主要是为了解决数据共享问题，是useState 的替代方案
```jsx
//使用
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
### `useContext`
主要是为了解决父子组件传值问题
```jsx
import React, {useState,createContext,useContext} from 'react';
const CountContext = createContext(); //声明一个context，被包裹的子组件通过这个context获取值
function Grandfather (){
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>点击</button>
      <CountContext.Provider value={count}>  {/*提供数据，其包裹的子孙组件都可以通过它获取值*/}
        <Father />
      </CountContext.Provider>  
    </div>
  )
}
function Father(){
  return <div><Child/></div>
}
function Child(){//祖先组件的值更新时，子孙组件也会更新
  let count = useContext(CountContext) //获取context的值   
  return <div>数值：{count}</div>
}
export default Grandfather;
```

### `useMemo`
当父组件一个状态发生变化时，子组件里的就会重新渲染一遍，假如父组件向子组件传递了状态a和b，当a变化时，我们不想让跟b有关的方法也执行，此时可以使用useMemo，它第一个参数接收一个函数，第二个参数是依赖项，只有依赖项发生变化时才运行函数
```jsx
const textMemo = useMemo(()=>countNumberaChange(),[a])
```
```jsx
import React, {useState, useMemo} from 'react';

function Parent(){
  const [countA,setCountA] = useState(0);
  const [countB,setCountB] = useState(0);
  return <div>
    <button onClick={()=>setCount(countA+1)}>点击</button>
    <Child countA={countA} countB={countB}/>
  </div>
}
function Child({countA,countB}) {
  const aChange = () => {
    //dosomething about countA
  }
  const countAChange = useMemo(()=>aChange(),[countA]) //countB变化时不执行
}
```

### `useLayoutEffect`

### `useCallBack`
当一个父组件向子组件传的值有函数时，由于父组件状态更新会引起子组件改变，有时我们不需要子组件改变，这时就可以使用useCallback将这个函数包裹，useCallback第二个参数可以传入一个依赖项，依赖项改变时函数执行
* [useCallBack_react官网](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)
```jsx

```
### `useImperativeHandle`

### `useDebugValue`
```jsx
//start-1start - async2 - async1end end settimeout
```

### `参考文档`
* [全面掌握 React — useReducer](https://www.jianshu.com/p/14e429e29798)
* [useReducer的使用详解和代替Redux](https://my.oschina.net/u/4890577/blog/4819842)
* [相关视频](bilibili.com/video/BV11z4y1Q7ic)

