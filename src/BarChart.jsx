// // src/components/BarChart.js
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const BarChart = ({ data, onClick }) => {
//   const chartData = {
//     labels: ['Pending', 'Approved', 'Rejected', 'Payment'],
//     datasets: [
//       {
//         label: 'Form Status',
//         data,
//         backgroundColor: '#4BC0C0',
//         borderColor: '#fff',
//         borderWidth: 2,
//       },
//     ],
//   };

//   return (
//     <div style={{ cursor: 'pointer' }} onClick={onClick}>
//       <Bar data={chartData} />
//     </div>
//   );
// };

// export default BarChart;

// src/components/BarChart.js
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import { useNavigate } from 'react-router-dom';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const BarChart = ({ data }) => {
//   const navigate = useNavigate();

//   const handleClick = (event, elements) => {
//     if (elements.length > 0) {
//       const index = elements[0].index;
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
//         label: 'Form Status',
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
//           color: '#fff',
//         },
//       },
//       tooltip: {
//         bodyColor: '#fff',
//         titleColor: '#fff',
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#fff',
//         },
//         grid: {
//           color: '#444',
//         },
//       },
//       y: {
//         ticks: {
//           color: '#fff',
//         },
//         grid: {
//           color: '#444',
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ cursor: 'pointer' }}>
//       <Bar data={chartData} options={options} onClick={handleClick} />
//     </div>
//   );
// };

// export default BarChart;
//   return (
//     <div style={{ cursor: 'pointer' }}>
//       <Bar data={chartData} options={{ onClick: handleClick }} />
//     </div>
//   );
// };

// export default BarChart;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const chart = event.chart;

    // If event.chart is undefined, ensure the chart instance is correctly passed
    if (!chart) {
      console.error('Chart instance is not available.');
      return;
    }

    // Get the relative position of the click event
    const { x, y } = event.chart.scales.x.getValueForPixel(event.native.x);
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
        label: 'Form Status',
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
          color: '#fff',
        },
      },
      tooltip: {
        bodyColor: '#fff',
        titleColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
    },
    onClick: handleClick
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
