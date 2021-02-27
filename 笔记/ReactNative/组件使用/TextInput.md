### `组件的基本使用`
```jsx
const inputChange = (e) => {
  setInputValue(e)//e是文本值
}
<TextInput 
  style={[styles.inputWrapper, {width:width*.5,height: width*.08}]} 
  onChangeText={inputChange} //监听文本的变化，返回文本值
  placeholder="请输入关键词"
  value={inputValue}
  clearButtonMode="while-editing" //显示清除按钮（在编辑时显示）
/>
```