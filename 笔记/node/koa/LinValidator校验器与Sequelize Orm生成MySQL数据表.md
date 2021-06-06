### `LinValidator校验器基本使用`
很多校验库都使用了Validator.js这个库
```js
const { LinValidator, Rule } = require('../../core/lin-validator');

class PositiveIntegerValidator extends LinValidator {
  super()
  constructor(){
    this.id = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
  }
}
MediaQueryList.exports = {
  PositiveIntegerValidator
}

//在接口中使用
const body = ctx.request.body;
const v = new PositiveIntegerValidator();
v.validate(ctx);
//通过validator获取查询参数
//设置parsed=false时对原始接收数据不做处理
//内部使用了lodash库
v.get('path.id',parsed=false)
```

### `配置文件及在终端显示异常`
```js
//将环境配置挂载到全局global，方便使用
static loadConfig(path = ''){
  const configPath = path||process.cwd() + '/config/config.js';
  const config = require(configPath)
  global.config = config
}
// config/config.js
module.exports = {
  environment: 'dev'
}
```

### `关系型数据看和非关系型数据库`

* 非关系型数据库：常用Redis和MongoDB
  * MongoDB里存的都是js对象
  * Redis里存的都是键值对，里面都是以key、value的形式存储的，redis也可以用来持久化数据，但它主要是做缓存的

### `Sequelize初始化配置与注意事项`
```js
//在core文件夹下创建db.js文件
const Sequelize = require('sequelize');

const { 
  dbName,
  host,
  password,
  port,
  user
} = require('../config/config').database;
//Sequelize可接收四个参数（dbName：连接的数据库，user：用户名，password：密码，第四个参数是一个js对象）
const sequelize = new Sequelize(dbName,user,password,{
  dialect: 'mysql',
  host,
  port,
  // logging: true,//是否开启数据库操作在命令行的显示，默认为true
  timezone: '+08:00',//设置使用，加八小时使用北京时间
  define: {
    timestamps: false,//不添加创建时间和更新时间和删除时间字段（create_time,update_time,delete_time）
    paranoid: true,
    createdAt: 'created_at',
    underscored: true
  }
});

sequelize.sync({
  force: true//若表已存在，再向表中添加其他字段时会添加要添加的字段，如果不配置该项（默认false），那么若表已存在，再往里添加字段将不生效
})

module.exports = {
  sequelize
}
```

### `使用Sequelize生成视图`

```js
//在app文件夹下创建models文件夹，并创建user.js
const { sequelize } = require('../../core/db');

const { Sequelize, Model }  = require('sequelize');
class User extends Model {

}

User.init({
  //如果自己定义id，尽量用数字，不要用字符出（查的慢），更不要用随机字符串
  id: {//id也可以不设置，Sequelize可以自动生成
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
  //微信中，每个人不同的小程序于不同的openId，如果想跨小程序或公众号通信，需用到uionId，

},{
  sequelize,
  tableName: 'user'
})
```
