### `安装依赖`
```bush
$ yarn add react-redux
$ yarn add redux
```

### `创建store`
* 创建store文件夹
* 创建index.js:
```jsx
import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);
export default store;
```
* 创建reducer.js:
```jsx
import { reducer as home } from '../home';
import { combineReducers } from 'redux';
const reducer = combineReducers({
  home
})

export default reducer
```
* 包装APP.js
```jsx
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};
```
* 在其他页面使用store
```jsx
import { connect } from 'react-redux';
const mapState = (state) => {
  return {
    name: state.home.name
  }
}
const mapDispatch = (dispatch) => {
  return {
    setNmae(){

    }
  }
}
export default connect(mapState,mapDispatch)(Home)
```
*在home下创建reducer.js存储数据
```jss
const defaultState = {
  name: 'tom'
}
export default (state = defaultState, action) => {
  return state
}
```
* 在home下的index.js中使用reducer
```jsx
import reducer from './reducer';


```