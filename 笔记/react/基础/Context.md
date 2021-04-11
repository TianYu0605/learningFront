### `基本定义`
react使用context实现祖先组件向后代组件跨层级传值，vue中的provide和inject来源于context<br>
在context模式下，有两个角色：
* Provide：外层提供数据的组件
* Consumer： 内层获取数据的组件

### `使用context`
创建context=>获取Provider和Consumer=>Provider提供值=>Consumer消费值

### `使用案例：模拟redux存放全局状态，在组件间共享`
```jsx
//App.js
import React from 'react';
import Home from './pages/home';
import User from './pages/User';
import { Provider } from './AppContext';

const store = {
  home: {
    imgs: [{src:'sss.png'}]
  },
  user: {
    isLogin:true,
    userName: true,
  }
}

function App() {
  return (
    <div className="app">
      <Provider><Home /></Provider>
    </div>
  )
}

export default App;

//AppContext.js
import React, {Component} from 'react';

export const Context = React.createContext();
export const Provider = Context.Provider;
export const Consumer = Context.Consumer;

//pages/Home.js
import React, { Component } from 'react';
import { Consumer } from '../AppContext';
export default class Home extends Component {
  render() {
    return (
      <Consumer>
        {
          ctx=><HomeCmp {...ctx}/>
        }
      </Consumer>
    )
  }
}
function HomeCmp(props){
  const { home, user } = props;
  const { isLogin, userName } = user;
  return (
    <div>
    {isLogin?userName:'登录'}
    </div>
  )
}

//pages/User.js
import React, { Component } from 'react';
import { Consumer } from '../AppContext';
import TabBar from '../components/TabBar';

export default class User extends Component {
  render() {
    return (
      <div>
        <Comsumer>
        {ctx=><UserCmp {...ctx}/>}
        </Consumer>
        <TabBar />
      </div>
    )
  }
}
function UserCmp(props) {
  const { home, user } = props;
  const { isLogin, userName } = user;
  return (
    <div>
    {isLogin?userName:'登录'}
    </div>
  )
}

//components/TabBar
import React from 'react';
import { Consumer } from '../AppContext';

export default function TabBar{
  render() {
    return (
      <div>
        <Comsumer>
        {ctx=><TabBarCmp {...ctx}/>}
        </Consumer>
        <TabBar />
      </div>
    )
  }
}
function TabBarCmp(props) {
  const { home, user } = props;
  const { isLogin, userName } = user;
  return (
    <div>
    {isLogin?userName:'登录'}
    </div>
  )
}
```

### `参考文档`
* [React Context上下文](https://www.cnblogs.com/qiqi715/p/10414229.html)