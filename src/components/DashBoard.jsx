import React from 'react'
import DashboardChart from './DashboardChart';
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
const DashBoard = () => {
    const { loginuser } = useContext(LoginDetails);
    return (
      <div className=' my-20'>
        {loginuser ? (
          <div className=' flex flex-col gap-y-10 mt-10'>
            <DashboardChart charttype="Line" />
            <DashboardChart charttype="Doughnut" />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
}

export default DashBoard