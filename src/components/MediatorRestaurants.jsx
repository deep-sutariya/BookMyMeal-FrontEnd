import React, { useEffect, useState } from "react";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import "../components/style/home.css";
import "../components/style/cards.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import ResCard from "./ResCard";
import { toast } from "react-toastify";

const MediatorRestaurants = () => {

  const { loginuser } = useContext(LoginDetails);

  const [restaurents, setRestaurents] = useState([]);
  const [filteredRes, setfilteredRes] = useState([]);
  let [loading, setLoading] = useState(true);

  const removeRestaurant = async () => {
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/removerestaurant`, {_id: loginuser?._id, remail : loginuser?.restaurant[0]?.remail} );
    toast.success(data?.data?.message,{
      position: toast.POSITION.TOP_RIGHT,
    });
  }

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
            return (
              resData.rcity.toLowerCase() === data?.data[0].PostOffice[0].District.toLowerCase()
              ||
              resData.rcity.toLowerCase() ===
              data?.data[0].PostOffice[0].Block.toLowerCase() ||
              resData.rpincode === data?.data[0].PostOffice[0].Pincode
            );
          })
        );
      } else {
        document.getElementById("searchid").value = "";
        setfilteredRes([]);
        toast.warn("Our Services for the given PinCode will start soon", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      document.getElementById("searchid").value = "";
      setfilteredRes([]);
      toast.warn("Enter Valid Pincode", {
        position: toast.POSITION.TOP_RIGHT,
      });
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

      {
        loginuser?.restaurant?.length > 0 ?
          <div className="max-w-md mx-auto mt-16 bg-transparent shadow-3xl rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{loginuser?.restaurant[0].rname}</div>
              <p className="text-gray-700 text-base">{loginuser?.restaurant[0].remail}</p>
              <p className="text-gray-700 text-base">{loginuser?.restaurant[0].rphone}</p>
            </div>
            <div className="px-6 py-4">
              <button
                onClick={removeRestaurant}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          </div>

          :

          <div>
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
                          id={_id}
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
                          id={_id}
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
          </div>

      }

    </>
  );
};

export default MediatorRestaurants;