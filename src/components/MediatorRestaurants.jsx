import React , { useEffect , useState} from "react";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import "../components/style/home.css";
import "../components/style/cards.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import ResCard from "./ResCard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

// const MediatorRestaurants = () => {
//     let [loading, setLoading] = useState(true);
//     const { loginuser } = useContext(LoginDetails);
//     const getData = async () => {
//       setLoading(true);
//       const data = await axios.post(
//         `${process.env.REACT_APP_HOST_IP}/getorders`,
//         {
//           memail: loginuser?.memail,
//         }
//       );
//       const d = data.data.data;
//       console.log('Data ', d);
//       setLoading(false);
//     };
//     useEffect(() => {
//       getData();
//     }, []);
//     const lineState = {
//       labels: ["Initial Amount", "Amount Earned"],
//       datasets: [
//         {
//           label: "TOTAL AMOUNT",
//           backgroundColor: ["tomato"],
//           hoverBackgroundColor: ["rgb(197, 72, 49)"],
//           data: [0, 4],
//         },
//       ],
//     };
//     return (
//       <div className="lineChart">
//         Charts
//         <Line data={lineState} />
//       </div>
//     );
// }



const MediatorRestaurants = () => {
    
        const [restaurents, setRestaurents] = useState([]);
    const [filteredRes, setfilteredRes] = useState([]);
    let [loading, setLoading] = useState(true);

    const getData = async () => {
      setLoading(true);
      const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/res`);
      setRestaurents(data.data);
      setLoading(false);
    };
    useEffect(() => {
      getData();
    }, []);

    let pincode;
    const search = async () => {
      pincode = document.getElementById("searchid").value;
      if (pincode === "") setfilteredRes([]);
      else if (pincode.length === 6) {
        const data = await axios.get(
          `${process.env.REACT_APP_PIN_API}/${pincode}`
        );

        if (data?.data[0].Status === "Success") {
          setfilteredRes(
            restaurents?.filter((resData) => {
              console.log(resData.rcity.toLowerCase());
              return (
                // resData.rcity.toLowerCase() === data?.data[0].PostOffice[0].District.toLowerCase()
                // ||
                resData.rcity.toLowerCase() ===
                  data?.data[0].PostOffice[0].Block.toLowerCase() ||
                resData.rpincode === data?.data[0].PostOffice[0].Pincode
              );
            })
          );
        } else {
          document.getElementById("searchid").value = "";
          setfilteredRes([]);
          alert("Our Services for the given PinCode will start soon");
        }
      } else {
        document.getElementById("searchid").value = "";
        setfilteredRes([]);
        alert("Enter Valid Pincode");
      }
    };

    const enterHandle = (e) => {
      if (e.key == "Enter") {
        search();
      }
    };

    const clear_filter = (e) => {
      setfilteredRes([]);
    };

    return (
      <>
        {/* <h1 style={{textAlign : "center",margin: "40px 0px"}}>Categories</h1>
        <Types /> */}

        <div className="search_box">
          <input
            className="search_input"
            type="text"
            placeholder="PinCode..."
            id="searchid"
            onKeyDown={enterHandle}
          />
          <button className="search_button" onClick={search}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <h1
          style={{
            textAlign: "center",
            margin: "50px 0px",
            textDecoration: "underline",
          }}
          className=" text-xl"
        >
          Restaurants
        </h1>

        {filteredRes.length > 0 ? (
          <h4
            style={{
              textAlign: "center",
              margin: "10px 0px",
              textDecoration: "underline",
            }}
            className="clear_filter"
            onClick={clear_filter}
          >
            Clear Filter
          </h4>
        ) : (
          <></>
        )}

        {loading ? (
          <div className="loader">
            <BounceLoader
              size={50}
              color="black"
              aria-label="Loading Spinner"
              data-testid="loader"
            />{" "}
          </div>
        ) : (
          <div className="all_cards">
            {filteredRes.length > 0
              ? filteredRes.map(
                  ({ _id, rname, raddress, rimage, rating, ratingcount }) => (
                    <div className="Card_container" key={_id}>
                      <ResCard
                        rimage={rimage}
                        rname={rname}
                        raddress={raddress}
                        rid={_id}
                        rating={rating}
                        ratingCount={ratingcount}
                        />
                    </div>
                  )
                )
                : Object.keys(restaurents).length > 0 &&
                restaurents.map(
                  ({ _id, rname, raddress, rimage, rating, ratingcount }) => (
                    <div className="Card_container" key={_id}>
                      <ResCard
                        rimage={rimage}
                        rname={rname}
                        raddress={raddress}
                        rid={_id}
                        rating={rating}
                        ratingCount={ratingcount}
                        />
                    </div>
                  )
                )}
          </div>
        )}
      </>
    );
};

export default MediatorRestaurants;