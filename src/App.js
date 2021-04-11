import React, { useEffect } from 'react';
import Title from './title';
import TestHooks from './testHooks';
import Rotate from './rotate/index';


const App = () => {
  useEffect(()=>{
    let headElement = document.getElementsByTagName('head')[0];
        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel','Shortcut Icon')
        linkElement.setAttribute('type','image/x-icon')
        linkElement.setAttribute("href",'http://dingyue.ws.126.net/Z0aE7PFLIMM7Bq=prfbtroBx=decQA3uDNoFT7zMfxa571499517946140compressflag.png')
        headElement.appendChild(linkElement); //是在head尾部插入，如果shead中已有，则不生效
  })
  return <div style={{width:'100%',height:800,overflow:'hidden'}}>
    
    <Title>
      <div style={{width:300,marginLeft:100}}>are you ok</div>
      <div style={{position:'absolute',right:100}}>hahahahaahh</div>
    </Title>
    <TestHooks />
    <Rotate />
  </div>
}

export default App
