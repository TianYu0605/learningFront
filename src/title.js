import React from 'react';

const Title = (props) => {
  return (
    <div style={{width:1600,backgroundColor:'yellow', height:80,display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
      <div style={{width:200}}>hello react</div>
      <div style={{position:'relative'}}>{props.children}</div>
    </div>
  )
}
export default Title;