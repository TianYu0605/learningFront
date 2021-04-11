
import React, {useState,createContext,useContext} from 'react';
const CountContext = createContext();
function Grandfather (){
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>点击</button>
      <CountContext.Provider value={count}>
        <Father />
      </CountContext.Provider>  
    </div>
  )
}
function Father(){
  return <div><Child/></div>
}
function Child(){
  let count = useContext(CountContext)
  return <div>数值：{count}</div>
}
export default Grandfather;