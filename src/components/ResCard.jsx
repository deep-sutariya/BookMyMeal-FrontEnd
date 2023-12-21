import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/style/cards.css";
import { UserSelectedResContex } from "../contex/UserSelectedRestaurant";
import { useContext } from "react";
import axios from "axios";
import { LoginDetails } from "../contex/Logincontex";
const Cards = (props) => {
  const resid = props.id
  const { loginuser } = useContext(LoginDetails);
  const {
    setSelectedRestaurantMenu,
    setSelectedRestaurant,
    SelectedRestaurant,
    SelectedRestaurantMenu,
  } = useContext(UserSelectedResContex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/requestrestaurant`, {
      mname: loginuser?.mname,
      memail: loginuser?.memail,
      resid
    });
    alert(data?.data?.message);
    const d = data.data?.data;
    if (data?.status === 200) {
        console.log('Data ' , d);
        navigate("/mediatorhome/dashboard");
    }
  };

  const navigate = useNavigate();

//   const toMenuPage = async (e) => {
//     const SelectedResId = e.target.id;

//     const data = await axios.post(
//       `${process.env.REACT_APP_HOST_IP}/getorders`,
//       {
//         id: SelectedResId,
//       }
//     );
//     sessionStorage.setItem(
//       "selectedrestaurent",
//       data?.data?.selectedrestaurenttoken
//     );
//     // setting the context values before reaching tp the restaurantmenu page....
//     // also initializing the value of cart before reaching the reatuarant menu page.
//     setSelectedRestaurant(data?.data?.data);
//     setSelectedRestaurantMenu(data?.data?.data?.rmenu);
//     navigate("/analysis");
//   };

  return (
    <div className="res_card">
      <div className="res_img">
        <img src={props.rimage} alt={props.rid} />
      </div>
      <div className="res_details">
        <div className="wrapper_card">
          <h2 className="res_heading">{props.rname.toUpperCase()}</h2>
          <p>{props.raddress}</p>
          <h2 style={{ fontWeight: "bolder", alignItems: "center" }}>
            {props.rating + " ⭐"}
            <span className="ratingcount">{"(" + props.ratingCount + ")"}</span>
          </h2>
        </div>
        <div className="res_btn">
          <button id={props.rid} onClick={handleSubmit}>
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
