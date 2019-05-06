import * as React from 'react';
import { Card } from 'antd';
// 按需加载，先加载核心库
import echarts from 'echarts/lib/echarts';
// const echarts = React.lazy(() => import('echarts/lib/echarts'));
// 导入饼形图功能
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/component/tooltip'; // 提示框组件
// import 'echarts/lib/component/title'; // 标题组件
// import 'echarts/lib/component/legend'; // 图表中的线功能
// import 'echarts/lib/component/markPoint'; // 图表中的点功能
// 图表的基础组件功能
import(/* webpackPrefetch: true */ 'echarts/lib/chart/pie');
import(/* webpackPrefetch: true */ 'echarts/lib/component/tooltip');
import(/* webpackPrefetch: true */ 'echarts/lib/component/title');
import(/* webpackPrefetch: true */ 'echarts/lib/component/legend');
import(/* webpackPrefetch: true */ 'echarts/lib/component/markPoint');
// const ReactEcharts = React.lazy(() => import('echarts-for-react'));

import ReactEcharts from 'echarts-for-react'; // react版本的echarts，可以组件化
import echartTheme from '../echartTheme'; // 图片自定义颜色

// interface IProps {}
// interface IState {}
export default class Pie extends React.Component<object> {
  public constructor(props) {
    super(props);
  }
  public render() {
    // 第一个图表的数据
    let series1 = [
      {
        name: '订单量', // 定义鼠标移动上显示的文字
        type: 'pie', // 使用饼图类型
        radius: '55%',
        center: ['50%', '60%'],
        // 渲染的数据，和x轴定义一一对应
        data: [
          {
            value: 1000,
            name: '周一'
          },
          {
            value: 1000,
            name: '周二'
          },
          {
            value: 2000,
            name: '周三'
          },
          {
            value: 1500,
            name: '周四'
          },
          {
            value: 3000,
            name: '周五'
          },
          {
            value: 2000,
            name: '周六'
          },
          {
            value: 1200,
            name: '周日'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ];
    // 第二个图表的数据
    let series2 = [
      {
        name: '订单量',
        type: 'pie',
        // 中心空圆大小，实心圆大小（要比前面比）
        radius: ['50%', '80%'],
        center: ['50%', '60%'],
        data: [
          {
            value: 1000,
            name: '周一'
          },
          {
            value: 1000,
            name: '周二'
          },
          {
            value: 2000,
            name: '周三'
          },
          {
            value: 1500,
            name: '周四'
          },
          {
            value: 3000,
            name: '周五'
          },
          {
            value: 2000,
            name: '周六'
          },
          {
            value: 1200,
            name: '周日'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ];

    return (
      <div>
        <Card title="饼图表一">
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series1)}
            notMerge={true}
            lazyUpdate={true}
            theme={'Izzq'}
          />
        </Card>

        {/* 本身图表是响应式的，所以当一格内有三条数据，就会变成三个 */}
        <Card title="环形图表二" style={{ marginTop: 10 }}>
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series2)}
            notMerge={true}
            lazyUpdate={true}
            theme={'Izzq'}
          />
        </Card>
      </div>
    );
  }
  // 组件渲染前触发
  public componentWillMount(): void {
    // 给echarts注入主题色--自定义颜色
    echarts.registerTheme('Izzq', echartTheme);
  }

  // 获取图表参数函数
  public getOption = (series, legend?) => {
    let option = {
      title: {
        text: '用户订单',
        x: 'center' // 标题居中
      },
      // 设置图表顶上可筛选
      legend: {
        orient: 'vertical', // 垂直方向居中
        right: 10,
        top: 20,
        bottom: 10,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item', // 鼠标移动上去了。展示x轴的数据
        // 格式化series数据 a系列名(name) b数据名(每个数据里面的name) c数据值(value) d比例 e
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // X轴数据
      xAxis: {
        // 这是底部显示的文字
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      // Y轴数据
      yAxis: {
        type: 'value'
      },
      series
      // 这是整个显示的数据源
      // series: [
      //   {
      //     name: '订单', // 鼠标指向单个柱图显示的文字
      //     type: 'bar',
      //     // barWidth: '60%',
      //     // 这是每个柱状图数据
      //     data: [800, 1520, 2000, 3340, 3900, 3300, 2200]
      //   }
      // ]
    };
    return option;
  }
}
