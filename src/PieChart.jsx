// src/components/PieChart.js
// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { useNavigate } from 'react-router-dom';

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const PieChart = ({ data }) => {
//   const navigate = useNavigate();

//   const handleClick = (event) => {
//     const { datasetIndex, index } = event.chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, true)[0] || {};

//     if (index !== undefined) {
//       switch (index) {
//         case 0:
//           navigate('/pendingtax');
//           break;
//         case 1:
//           navigate('/approvedRequest');
//           break;
//         case 2:
//           navigate('/rejectedform');
//           break;
//         case 3:
//           navigate('/payment');
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const chartData = {
//     labels: ['Pending', 'Approved', 'Rejected', 'Payment'],
//     datasets: [
//       {
//         data,
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
//         borderColor: '#fff',
//         borderWidth: 2,
//       },
//     ],
//   };
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         labels: {
//           color: '#fff', // Color for the legend labels
//         },
//       },
//       tooltip: {
//         bodyColor: '#fff', // Color for the tooltip body text
//         titleColor: '#fff', // Color for the tooltip title text
//       },
//     },
//     elements: {
//       arc: {
//         borderColor: '#fff', // Border color of the arcs
//       },
//     },
//     color: '#fff', // General text color
//     scales: {
//       x: {
//         ticks: {
//           color: '#fff', // Color for the x-axis labels
//         },
//         grid: {
//           color: '#444', // Color for the x-axis grid lines
//         },
//       },
//       y: {
//         ticks: {
//           color: '#fff', // Color for the y-axis labels
//         },
//         grid: {
//           color: '#444', // Color for the y-axis grid lines
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ cursor: 'pointer' }}>
//       <Pie data={chartData} options={options} onClick={handleClick} />
//     </div>
//   );
// };

// export default PieChart;
//   return (
//     <div style={{ cursor: 'pointer' }}>
//       <Pie data={chartData} options={{ onClick: handleClick }} />
//     </div>
//   );
// };

// export default PieChart;
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const chart = event.chart;
    const elements = chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, true);

    if (elements.length > 0) {
      const index = elements[0].index;

      switch (index) {
        case 0:
          navigate('/pendingtax');
          break;
        case 1:
          navigate('/approvedRequest');
          break;
        case 2:
          navigate('/rejectedform');
          break;
        case 3:
          navigate('/payment');
          break;
        default:
          break;
      }
    }
  };

  const chartData = {
    labels: ['Pending', 'Approved', 'Rejected', 'Payment'],
    datasets: [
      {
        data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff', // Color for the legend labels
        },
      },
      tooltip: {
        bodyColor: '#fff', // Color for the tooltip body text
        titleColor: '#fff', // Color for the tooltip title text
      },
    },
    elements: {
      arc: {
        borderColor: '#fff', // Border color of the arcs
      },
    },
    onClick: handleClick
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
