import * as React from 'react';
import { Card } from 'antd';
// 按需加载，先加载核心库
import echarts from 'echarts/lib/echarts';
// 导入拆线图功能
import 'echarts/lib/chart/line';
// 图表的基础组件功能
import 'echarts/lib/component/toolbox'; // 提示框组件
import 'echarts/lib/component/title'; // 标题组件
import 'echarts/lib/component/legend'; // 图表中的线功能
import 'echarts/lib/component/markPoint'; // 图表中的点功能

import ReactEcharts from 'echarts-for-react'; // react版本的echarts，可以组件化
import echartTheme from '../echartTheme'; // 图片自定义颜色

// interface IProps {}
// interface IState {}
export default class Line extends React.Component<object> {
  public constructor(props) {
    super(props);
  }
  public render() {
    // 第一个图表的数据
    let series1 = [
      {
        name: '订单量',
        type: 'line',
        data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
      }
    ];
    // 第二个图表的数据
    let series2 = [
      {
        name: '汽配订单量',
        type: 'line',
        stack: '总量',
        data: [1200, 3000, 4500, 6000, 8000, 12000, 20000]
      },
      {
        name: '组件订单量',
        type: 'line',
        stack: '总量',
        data: [1000, 2000, 5500, 6000, 8000, 10000, 12000]
      }
    ];
    // 第三个图数据
    let series3 = [
      {
        name: '汽配订单量',
        type: 'line',
        stack: '总量',
        data: [1200, 3000, 4500, 6000, 8000, 12000, 20000],
        areaStyle: {} // 填充颜色
      },
      {
        name: '组件订单量',
        type: 'line',
        stack: '总量',
        data: [1000, 2000, 5500, 6000, 8000, 10000, 12000],
        areaStyle: {} // 填充颜色
      }
    ];

    return (
      <div>
        <Card title="拆线图表一">
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series1)}
            notMerge={true}
            lazyUpdate={true}
            theme={'Izzq'}
          />
        </Card>

        <Card title="拆线图表二" style={{ marginTop: 10 }}>
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series2)}
            notMerge={true}
            lazyUpdate={true}
            theme={'Izzq'}
          />
        </Card>

        <Card title="拆线图表三" style={{ marginTop: 10 }}>
          <ReactEcharts
            style={{ height: 500 }}
            option={this.getOption(series3)}
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
        text: '用户订单'
      },
      tooltip: {
        trigger: 'axis', // 鼠标移动上去了。展示x轴的数据
      },
      // X轴数据
      xAxis: {
        // 这是底部显示的文字
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        type:'category',
        boundaryGap: false, // 设置起点从0开始，默认是从第二个点开始的
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
