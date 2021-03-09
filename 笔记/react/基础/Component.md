### `displayName:定义调试时的组件name`
```jsx
 function withHOC(WrapComponent) {
   // 此处未定义名称或者希望动态定义名称
   return class extends React.Component {
     // 定义displayName
     static displayName = `withHOC(${WrapComponent.displayName || WrapComponent.name})`;
     render(){
       console.log("inside HOC")
       return <WrapComponent {...this.props } />;
     }
   }
 }

 App = withHOC(App);
```
### `pureComponent`
* pureComponent进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致 <br>
* 好处：当组件更新时，如果组件的props或者state都没有改变，render函数就不会触发。省去虚拟DOM的生成和对比过程，达到提升性能的目的。具体原因是因为react自动帮我们做了一层浅比较  <br>
* 注意：在通过PureComponent进行组件的创建的时候不能够在写shouldComponentUpdate. 否则会引发警告
### `参考文档`
* [React.Component用法](https://blog.csdn.net/baiyu753159/article/details/71597985)
* [PureComponent的浅比较](https://blog.csdn.net/juzipidemimi/article/details/80892440)
* [Component和PureComponent的区别](https://blog.csdn.net/u013003052/article/details/87894262)
* [React.Component用法]()
* [React.Component用法]()