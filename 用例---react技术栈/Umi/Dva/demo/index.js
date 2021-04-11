import dva from 'dva';
import './index.less';
import { createBrowserHistory as createHistory  } from 'history';
// import moment from 'moment';
// import locale from 'antd/es/locale/zh_CN';
// import 'moment/locale/zh-cn'; 


// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
require("./models").default.forEach(key => app.model(key.default))

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');