const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { env } = require('process');
const { merge } = require('lodash');
module.exports={
  mode:'development',//打包模式，development表示打包后不压缩代码，production表示打包后压缩代码
  devtool:'eval',  //开启sourceMap
  entry: {  
    main:'./src/index.js',
    lodash:'./src/lodash.js'
  }, //打包的入口文件
  devServer:{  //使用webpack起一个服务器，默认启动在8090
    overlay: true,
    contentBase:'./dist',//服务器启动的根路径
    open:true,  //自动打开浏览器，自动访问服务器地址
    hot:true,//样式热加载
    hotOnly: true,  //如果HMR失效，就让他失效，不做任何处理
    historyApiFallback: {
      rewrite: [{
        from: /abc.html/,
        to: 'views/landing.html'
      }]
    },
    proxy: {
      '/react/api': {
        target: 'https://www.dell-lee.com',
        secure:false,//转发https时要配置
        bypass:function(req, res, proxyOptions){
          if(req.headers.accept.indexOf('html')!==-1){
            return 'index.html'
          }//当你访问的是html文件时，会给你返回当前路径下html.index文件下的内容
        },//当返回值为false时，会跳过盖茨转换，该返回什么就返回什么
        pathRewrite: {
          'header.json': 'demo.json'
        }
      }
    }
  },
  module:{  //告诉webpack模块的打包方式
    rules:[
      {
        test:/\.(png|jpg|svg|gif)$/,
        use:{
          loader: 'url-loader',//使用file-loader打包png图片，需安装下这个loader
          options:{  //对图片的打包进行配置
            //这种配置的语法叫placeholder，中文叫占位符
            name: '[name].[ext]',  //配置打包出的图片名字为原名字，后缀为原后缀
            hash: '[hash]',  //打包出来文件的哈希值
            outputPath:'images/',  //打包出来的文件存放在dist
            limit:204800  //该字符串长度要小于等于204800字节，即小于200kb时
          }
        }
      },
      {
        test: /\.css$/,//打包css文件一般需要两个loader，这时use为数组
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,//node_modules里面的代码不使用babel转译
        use: [
          {
            loader:"babel-loader"
          },
          {
            loader: "imports-loader?this=>loader"
          },
          {
            loader: "eslint-loader",
            force: 'pre'//强制该loader先执行
          }
        ],
        options: {
          presets: [  //有执行顺序，先转化react，在转化es6
            ["@babel/preset-env",{  //转化es6代码
              targets:{
                chrome:"67",//在chrome版本大于67情况下运行,67版本以上支持es6,
              },
              useBuiltIns: "usage" //为低版本浏览器增加变量和方法时只增加代码需要的，而不是整个包都导进去
            }],
            ["@babel/preset-react"]  //转化react语法    
          ],
          plugins:["@babel/plugin-syntax-dynamic-import"]
        }
      }
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader',,'css-loader','sass-loader'],
      // }
    ]
  },
  // optimization:{
  //   splitChunks:{
  //     chunks: 'all'
  //   }
  // },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html'  //使用模板
    }),
    // new CleanWebpackPlugin(['dist'])
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({}),
    new  webpack.ProvidePlugin({
      $:'jquery'//当发现模块中用了$符号，就自动帮你引入jQuery
    })
  ],
  
  optimization:{
    usedExports:true,//导出的模块被使用了才打包
    splitChunks:{//如果设为空，他会使用默认的配置
      //其他参数：all:对所有代码进行分割
      chunks: 'async',//只对异步代码生效
      minSize: 30000,//引入的包大于30000个字节才做代码分割
      maxSize: 60000,//引入的包大于60000个人字节会尝试再进一步分割，一般不配该项
      minChunks:2,//引入了两次才做代码分割
      maxAsyncRequests: 5,//同时加载的模块数最多是五个
      maxInitialRequests:3,//首页入口文件最多引入三个，超过就不做代码分割
      automationNameDelimiter: '~',//分割文件生成时文件名的连接符
      name: true,
      cacheGroups:{
        vendors: {
          //检测引入的库是否在node_modules里面
          test: /[\\/]node_modules[\\/]/,
          priority:-10,//值越大优先级越高
          filename:'lodash.js'//导报后的文件名
        },
        default:{
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  },
  output:{   //打包后的输出
    publicPath:'./',
    filename:'index.js',  //第一次打包会被打包到main.js，第二次打包会打包到sub.js
    chunkFilename: '[name].chunk.js',//异步的、间接加载的文件名
    path:path.resolve(__dirname,'dist'),  //输出的文件名及地址
    
  }
}

module.exports = (env) => {
  if(env&&env.production){
    return merge(commomConfig,prodConfig)
  }else{
    return merge(commomConfig,devConfig)
  }
}