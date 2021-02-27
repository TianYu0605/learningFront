### `安装依赖`

最新版可参考：[!]()

### `基本使用`
```jsx
import React from 'react';
import { useEffect } from 'react';
import {View, Text, TabBarIOSItem} from 'react-native';
import Content from './components/content';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/home';
import Login from './pages/login';
import Article from './pages/article';
import List from './pages/list';
//导航所需依赖
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Page = () => {
  /**
   * 首页底部导航栏
   */
  const BottomTab = () => {
    const Tab  =createBottomTabNavigator();
    return (
      <Tab.Navigator style={styles.container}
        screenOptions = {({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case '首页': iconName = 'ios-home'; break;
              case '我的': iconName = 'person'; break;
            }
            return (
              <Ionicons 
                name = {iconName}
                size = {size}
                color = {color}
              />
            )
          }
        })}
        tabBarOptions = {{
          activeTintColor: '#4cc596',
          inactiveTintColor: '#999',
        }}
      >
        <Tab.Screen 
          name = '首页'
          component = {Home}
        />
        <Tab.Screen 
          name = '我的'
          component = {List}
        />
      </Tab.Navigator>
    )
  };

  //使用栈导航
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name = 'Login'
          component = { Login }
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = 'Tab'
          component = { BottomTab }
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = 'Article'
          component = { Article }
          options={{
            headerTitle: '详情页',
            headerBackTitle: null,
            headerTitleAlign:'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Page;
```