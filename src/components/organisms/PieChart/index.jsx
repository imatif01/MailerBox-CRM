import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = ({ data }) => {
  const chartData = useMemo(() => (Array.isArray(data) ? data : [{ name: 'No Data', value: 0 }]), [data]);

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      bottom: '0',
      textStyle: {
        color: '#858d98',
      },
    },
    series: [
      {
        type: 'pie',
        radius: '75%',
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
    color: ['#2783EC', '#1B1F3C', '#CACACA'],

    textStyle: {
      fontFamily: 'Poppins, sans-serif',
    },
  };

  return (
    <div className="card-body">
      <ReactEcharts style={{ height: '230px' }} option={option} />
    </div>
  );
};

export default PieChart;
