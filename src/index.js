import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
const rootRender = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rootRender();
// import React from './simpleReactYuanMa'
/**
 * let element = <div id='app'>hello dasheng</div>
 * 上述语句会解析成：React.createElement('h1',{id:'app'},'hellodasheng')
 * jsx语法必须引入React
 */

//  function App(props) {
//    return <div>
//    <h1>{props.title}开课吧</h1>
//    <p>全栈课</p>
//    <a href='http://www.kaikeba.com'>去吧</a>
//  </div>
//  }
// const simpleReact = () => {
//   let ReactDOM = React
//   ReactDOM.render(
//     <App title='hello'/>
//   ,document.getElementById('studyByDaSheng'))
// }

// simpleReact();






