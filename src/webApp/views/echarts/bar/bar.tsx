import * as React from 'react';
import { Card } from 'antd';
// 按需加载，先加载核心库
// const echarts = React.lazy(() => import('echarts/lib/echarts'));
import echarts from 'echarts/lib/echarts';
// 导入柱形图功能
// import 'echarts/lib/chart/bar';
import(/* webpackPrefetch: true */ 'echarts/lib/chart/bar');
// 图表的基础组件功能
// import 'echarts/lib/component/tooltip'; // 提示框组件
// import 'echarts/lib/component/title'; // 标题组件
// import 'echarts/lib/component/legend'; // 图表中的线功能
// import 'echarts/lib/component/markPoint'; // 图表中的点功能
import(/* webpackPrefetch: true */ 'echarts/lib/component/tooltip');
import(/* webpackPrefetch: true */ 'echarts/lib/component/title');
import(/* webpackPrefetch: true */ 'echarts/lib/component/legend');
import(/* webpackPrefetch: true */ 'echarts/lib/component/markPoint');
import ReactEcharts from 'echarts-for-react'; // react版本的echarts，可以组件化
import echartTheme from '../echartTheme'; // 图片自定义颜色
// const ReactEcharts = React.lazy(() => import('echarts-for-react'));

// interface IProps {}
// interface IState {}
export default class Bar extends React.Component<object> {
  public constructor(props) {
    super(props);
  }
  public render() {
    // 第一个图表的数据
    let series1 = [
      {
        name: '订单', // 鼠标指向单个柱图显示的文字
        type: 'bar',
        // barWidth: '60%',
        // 这是每个柱状图数据
        data: [800, 1520, 2000, 3340, 3900, 3300, 2200]
      }
    ];
    // 第二个图表的数据
    let series2 = [
      {
        name: 'OFO',
        type: 'bar',
        data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
      },
      {
        name: '摩拜',
        type: 'bar',
        data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
      },
      {
        name: '小蓝',
        type: 'bar',
        data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
      }
    ];
    // 第二图表的筛选参数
    let legend = {
      data: ['OFO','摩拜','小蓝']
    };

    return (
      <div>
        <Card title="柱形图表一">
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series1)}
            notMerge={true}
            lazyUpdate={true}
            theme={'Izzq'}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={}
            // key={'bar'}
          />
        </Card>

        {/* 本身图表是响应式的，所以当一格内有三条数据，就会变成三个 */}
        <Card title="柱形图表二" style={{ marginTop: 10 }}>
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series2,legend)}
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
      title: { text: '用户订单' },
      legend, // 设置图表顶上可筛选
      tooltip: {
        trigger: 'axis', // 鼠标移动上去了。展示x轴的数据
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'阴影
        }
      },
      // X轴数据
      xAxis: {
        // 这是底部显示的文字
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
