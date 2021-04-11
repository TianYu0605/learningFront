//@ts-nocheck
import React, { FC, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect, useDispatch } from 'umi';
import * as echarts from 'echarts';
import 'echarts-gl';
import mapOfShaoXing from '@/utils/shaoxinMap';

echarts.registerMap("绍兴", mapOfShaoXing);
const CenterChart: FC = () => {
  const chartRef:any = useRef(null);
  const dispatch = useDispatch();
  const chart = () => {
    const chart = echarts.init(chartRef.current);
    chart.clear();
    let data = [                // 可对单个地图区域进行设置
      {
        name: '越城区',
        value: '330602',
        itemStyle: {                // 单个区域的样式设置
          color: '#e78078',
        },
      },
      {
        name: '上虞区',
        value: '330604',
        itemStyle: {                // 单个区域的样式设置
          color: '#98a3af',
        },
      },
      {
        name: '柯桥区',
        value: '330603',
        itemStyle: {                // 单个区域的样式设置
          color: '#3f93d3',
        },
      },
      {
        name: '诸暨市',
        value: '330681',
        itemStyle: {                // 单个区域的样式设置
          color: '#1bbac4',
        }
      },
      {
        name: '嵊州市',
        value: '330683',
        itemStyle: {                // 单个区域的样式设置
          color: '#0ac88f',
        },
      },
      {
        name: '新昌县',
        value: '330624',
        itemStyle: {                // 单个区域的样式设置
          color: '#12c0ae',
        },
      }
    ];
    let option:any = {
      tooltip: { // 提示框
        trigger: 'item',
        formatter: function (params:any) {
          //console.log(params)
          return params.name + ":" + params.value;
        }
      },
      visualMap:{
        calculable: true,
      },
      series: [
        {
          name: '绍兴',
          type: 'map3D',
          map: '绍兴',  //必须和上面注册的地图名称一致，详细可以看ECharts的GL配置说明
          boxDepth: 'auto%', //地图倾斜度
          regionHeight: 2, //地图厚度
          boxWidth:'100%',
          width:'auto',
          height:'auto',
          light: {
            main: {
              intensity: 1.5
            }
          },
          label: {
            show: true, //是否显示市
            textStyle: {
              color: "#000", //文字颜色
              fontSize: 20, //文字大小
              // fontFamily: '微软雅黑',
              // backgroundColor: "rgba(0,0,0,0)", //透明度0清空文字背景
            },
          },
          data: data,
          itemStyle: {
            opacity: 1, // 透明度
            borderWidth: 1, //分界线宽度
            borderColor: "#808080", //分界线颜色
            color: "#ffffff",
          },
          emphasis: {
            itemStyle: {
              color: "#D3D3D3"
            },
          },
          groundplane: {
            show: false
          },
          shading: 'realistic',
          // 真实感材质相关配置 shading: 'realistic'时有效
          realisticMaterial: {
            detailTexture: '#fff', // 纹理贴图
            textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
            metalness: 0, // 0材质是非金属 ，1金属
            roughnessAdjust: 0,
          },
          viewControl: {
            autoRotate: false,//自动旋转
            distance: 115, // 地图视角 控制初始大小
            rotateSensitivity: 0, // 0不旋转  rotateSensitivity: [1, 0]只能横向旋转 rotateSensitivity: [1, 0]只能纵向旋转
            zoomSensitivity: 0, // 缩放操作的灵敏度，值越大越灵敏。默认为1。设置为0后无法缩放
          },
        }
      ],
    };
    chart.setOption(option);
    window.addEventListener("resize",()=>{
      chart.resize();
    });
  }
  useEffect(()=>{
    if (chartRef) {
      chart()
    }
  
  },[])

  const Navigation = () => {
    dispatch({
      type: 'common/updateState',
      payload: {
        showMap: true,
      }
    })
  }
  return (
    <div className={styles.centerChartWrapper} ref={chartRef}></div>
  )
};

const mapState = (state:any)=>{
  return {
    common: state.common
  }
};

export default connect(mapState)(CenterChart);