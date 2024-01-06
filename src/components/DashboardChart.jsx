import React, { useState, useEffect } from "react";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import { Chart } from "chart.js/auto";
import { Doughnut, Line ,Bar , Pie} from "react-chartjs-2";


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
  let surat = 0,
    bhavnagar = 0,
    junagadh = 0,
    vadodara = 0,
    ahemdabad = 0,
    kutchh = 0,
    other = 0;
  let young = 0 , middle = 0 , senior = 0;
  let male= 0 , female = 0;
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
    var area = morder[i].city;
    if( area == "Surat"){ surat++;}
    else if( area =="Bhavnagar"){bhavnagar++;}
    else if( area == "Vadodara" ){vadodara++;}
    else if( area == "Kutchh"){kutchh++;}
    else if( area == "Junagadh"){junagadh++;}
    else{
      other++;
    }
    let age = parseInt(morder[i].uage, 10);
    if( age >= 0 && age <= 18 ){ young++; }
    else if( age >= 18 && age <=40 ){ middle++ ;}
    else{ senior++ ;}

    let gender = morder[i].ugender;
    if( gender == "male"){ male++; }
    else{ female++;}
    console.log('uage' , age);
    console.log("City ", surat, bhavnagar , vadodara , kutchh , junagadh , other);
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
        backgroundColor: "#800080",
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
  const doughnutAgeState = {
    labels: ["Male", "Female"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [male, female],
      },
    ],
  };
  const pieState = {
    labels: [
      "Surat",
      "Vadodara",
      "Kutchh",
      "Bhavnagar",
      "Junagadh",
      "Ahemdabad",
      "Others",
    ],
    datasets: [
      {
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#800080",
          "#FFA500",
          "#008080",
        ],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [surat, vadodara, kutchh, bhavnagar, junagadh, ahemdabad, other],
      },
    ],
  };

  const lineState = {
    labels: ["0-18", "18-40", "40-70"],
    datasets: [
      {
        label: "Age",
        data: [young, middle, senior],
        borderColor: "#0000FF",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="mx-auto w-3/4">
      {charttype === "Bar" ? (
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Bar
              data={chartData}
              options={options}
              className="w-5/6 h-[200px]"
            />
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">
              Monthwise Orders
            </div>
          </div>
        </div>
      ) : charttype == "Doughnut" ? (
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">Items</div>
          </div>
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Doughnut data={doughnutState} className="w-5/6 h-[100px]" />
          </div>
        </div>
      ) : charttype == "Line" ? (
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Line
              data={lineState}
              options={options}
              className="w-5/6 h-[200px]"
            />
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">
              Agewise Orders
            </div>
          </div>
        </div>
      ) : charttype == "Pie" ? (
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">City</div>
          </div>
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Pie data={pieState} className="w-5/6 h-[100px]" />
          </div>
        </div>
      ) :(
        <div className="flex items-center justify-center gap-x-10 flex-row h-1/4 w-full">
          <div className="w-1/2 flex justify-center py-6 items-center h-[400px] bg-slate-50 p-4">
            <Doughnut data={doughnutAgeState} className="w-5/6 h-[100px]" />
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className=" font-bold text-xl text-red-400">Genderwise Orders</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardChart;
