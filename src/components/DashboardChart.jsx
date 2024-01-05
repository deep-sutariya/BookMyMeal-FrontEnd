import React, { useState, useEffect } from "react";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import { Chart } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";


const DashboardChart = ({ charttype }) => {
  let [loading, setLoading] = useState(true);
  const [morder, setMorder] = useState();
  const { loginuser } = useContext(LoginDetails);
  const getData = async () => {
    setLoading(true);
    const data = await axios.post(
      `${process.env.REACT_APP_HOST_IP}/getmedorder`,
      {
        memail: loginuser?.memail,
      }
    );
    const d = data?.data?.data;
    setMorder(d);
    console.log("Data ", d);
    setLoading(false);
  };
  let burger = 0, pizza = 0;
  const length = 12; // Set the desired length of the array
  const totalOrders = new Array(length).fill(0);
  for (let i = 0; i < morder?.length; i++) {
    var type = morder[i].type;
    console.log('Type ', type)
    if (type === "pizza") {
      pizza++;
    }
    else {
      burger++;
    }
    console.log('Pizza & Burger ', pizza, burger);
    let m = parseInt(morder[i].month, 10);
    if (m >= 1 && m <= 12) {
      console.log('m value ', m)
      totalOrders[m - 1]++;
    }
  }
  console.log('Total Orders ', totalOrders);
  // const ageData = morder?.map((entry) => parseInt(entry.uage, 10));
  // const monthData = morder?.map((entry) => entry.month);
  // Chart data
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Month wise Orders",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "black",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "white",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: totalOrders,
      },
    ],
  };
  const doughnutState = {
    labels: ["Pizza", "Burger"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [pizza, burger],
      },
    ],
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="mx-auto w-3/4">
      {charttype === "Line" ? (
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Line
              data={chartData}
              options={options}
              className="w-5/6 h-[200px]"
            />
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">Monthwise Orders</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">Items</div>
          </div>
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Doughnut data={doughnutState} className="w-5/6 h-[100px]" />
          </div>
        </div>
      )}
    </div>
  );
}
// const DashboardChart = ({ charttype }) => {
//   let [loading, setLoading] = useState(true);
//   const [ morder , setMorder ] = useState();
//   const { loginuser } = useContext(LoginDetails);
//   const getData = async () => {
//     setLoading(true);
//     const data = await axios.post(
//       `${process.env.REACT_APP_HOST_IP}/getmedorder`,
//       {
//         memail: loginuser?.memail,
//       }
//     );
//     const d = data?.data?.data;
//     setMorder(d);
//     console.log("Data ", d);
//     setLoading(false);
//     console.log('Mo ' , morder);
//   };
//   let young = [];
//   let middle = [];
//   let senior = [];
//   for (let i = 0; i < morder?.length; i++) {
//     if (morder[i].uage > 0 && morder[i].uage <= 18) {
//       young = [...young, morder[i].uage];
//     } else if (morder[i].uage > 18 && morder[i].uage <= 50) {
//       middle = [...middle, morder[i].uage];
//     } else {
//       senior = [...senior, morder[i].uage];
//     }
//   }
//   console.log("Young ", young);
//   console.log("Middle ", middle);
//   console.log("Senior ", senior);
//   useEffect(() => {
//     getData();
//   }, []);
//    const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

//   const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: middle,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: young,
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
//   };
//   return (
//     <div className="mx-auto">
//       {charttype === "Line" ? (
//         <div className="flex items-center justify-center gap-x-10 flex-row h-full w-full">
//           <div className="w-full h-full bg-slate-200">
//             <Line data={data} className="w-1/2"/>
//           </div>
//           <div className="w-1/2">DESCRIPTIOON</div>
//         </div>
//       ) : (
//         <Doughnut data={data} />
//       )}
//     </div>
//   );
// };

export default DashboardChart;
