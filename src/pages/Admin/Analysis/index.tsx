import { listTopInvokeInterfaceInfoUsingGet } from '@/services/yunApi-backend/analysisController';
import { PageContainer } from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

// render echarts option.

/**
 * 接口分析
 * @constructor
 */
const Analysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);

  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGet().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (e: any) {}
    // todo 从远程获取数据
  }, []);

  // 映射：{ value: 1048, name: 'Search Engine' },
  const chartData = data.map((item) => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });

  // ECharts图表的配置选项
  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer>
      {/* 使用 ReactECharts 组件，传入图表配置 */}
      <ReactECharts option={option} />
    </PageContainer>
  );
};
export default Analysis;
