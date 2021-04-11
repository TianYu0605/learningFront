import React,{useEffect} from 'react';
import './index.css';


const Index = () => {
  
  var path_length = 375;	//定义路径的半长轴的长度
  var path_width = 150;	//定义路径的半短轴的长度
  
  var ball_gap = 0.8;		//小球间距
  
  let timer = null;
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame    
        // function( callback ){
        //   window.setTimeout(callback, 1000 / 60);
        // };
  })();
  //取消帧事件（兼容性写法）
  const cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame 
        // function (timer) {
        //   window.clearTimeout(timer);
        // };
  })();
  //监听帧事件，帧渲染和帧绘制的变量
  const timerList = [null,null,null,null,null,null];
  const onMouseOverBall = () => {
    const [...ballElementList] = document.getElementsByClassName('ball');
    ballElementList.forEach((item,index)=>{
      item.addEventListener('mouseover',()=>{
        if( timerList[index] !== null ){
          ballList.map((_,count)=>{
            cancelAnimationFrame(timerList[count]);
          })
        }
      })
      
    }) 
  } 
  const onMouseOut = () => {
    const [...ballElementList] = document.getElementsByClassName('ball');
    ballElementList.forEach((item,index)=>{
      item.addEventListener('mouseout',()=>{
        ballList.map((_,index) => {
          const rotateDraw =  function () {
            rotateItem(index)
            timerList[index] = requestAnimationFrame(rotateDraw);
          }
          rotateDraw()
        })
      }) 
    }) 
  }
  var angelList = [0,60,120,180,240,300];		//初始化角度为0
  const rotateItem = (index) => {
    const ball = document.getElementsByClassName('ball')[index];
    const ballWidth = Number(ball.style.width.replace('px',''));
    const leftChangeAngel = 180;
    const middleChangeAngel = 270;
    const rightChangeAngel = 359;
    const path_angel = angelList[index];
    var angel_increase = 1;	//小球运动角度增量
    var angel = (path_angel * Math.PI / 180) % 360;
    ball.style.left = path_length * Math.cos(angel) + path_length + ballWidth/2 + "px";
    ball.style.top = path_width * Math.sin(angel) + path_width + ballWidth/2 + "px";
    angelList[index] = (path_angel + angel_increase) % 360;
    if (path_angel>leftChangeAngel && path_angel<=middleChangeAngel) {
      ball.style.width = `${70+((middleChangeAngel-path_angel)/90)*70}px`
      ball.style.height = `${70+((middleChangeAngel-path_angel)/90)*70}px`
    } else if (path_angel>middleChangeAngel && path_angel<=rightChangeAngel) {
      ball.style.width = `${70+((path_angel-middleChangeAngel)/90)*70}px`
      ball.style.height = `${70+((path_angel-middleChangeAngel)/90)*70}px`
    } else {
      ball.style.width = `140px`
      ball.style.height = `140px`
    }
    // if (path_angel>330||path_angel<30) {
    //   angel_increase = 5
    // } else {
    //   angel_increase = 1
    // }
    console.log(path_angel);
  }
  const ballList = ['越城','柯桥','嵊州','新昌','诸暨','上虞']
  // const ballList = ['越城']
  useEffect(()=>{
    // ballList.map((_,index) => {
    //   const rotateDraw =  function () {
    //     rotateItem(index)
    //     timerList[index] = requestAnimationFrame(rotateDraw);
    //   }
    //   rotateDraw()
    // })
    // onMouseOverBall()
    // onMouseOut()
    // return ()=>{
    //   ballList.map((_,index)=>{
    //     cancelAnimationFrame(timerList[index]);
    //   })
    // }
  },[])
 
  return <div className='rotateBallWrapper'>
    <div className='rotateBallContainer'>
      {
        ballList.map((item)=>(
          <div className='ball' style={{width:140,height:140}}></div>
        ))
      }
      
    </div>
  </div>
}

export default Index;