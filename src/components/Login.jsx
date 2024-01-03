import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./style/login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import restaurentlogo from '../assets/restaurentlogo.jfif';
import userlogo from '../assets/userlogo.jfif';
import login from '../assets/login.svg'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";

function Login({ setNavType }) {
  const { setloginrestaurant, loginrestaurant, setloginuser, loginuser } = useContext(LoginDetails);

  var data;
  const location = useLocation();
  const navigate = useNavigate();
  const [loginoption, setLoginOption] = useState("");

  const [user, setuser] = useState({
    uemail: "",
    upass: "",
  });


  const handleRestaurent = () => {
    setLoginOption("restaurent");
    document.getElementById('use').style.backgroundColor = "white";
    document.getElementById('mediator').style.backgroundColor = "white";
    document.getElementById('res').style.backgroundColor = "var(--light)";
  }
  const handleUser = () => {
    setLoginOption("user");
    document.getElementById('res').style.backgroundColor = "white";
    document.getElementById('mediator').style.backgroundColor = "white";
    document.getElementById('use').style.backgroundColor = "var(--light)";
  }
  const handleMediator = () => {
    setLoginOption("mediator");
    document.getElementById('res').style.backgroundColor = "white";
    document.getElementById('use').style.backgroundColor = "white";
    document.getElementById('mediator').style.backgroundColor = "var(--light)";
  }

  let name, value;
  function change(e) {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
    e.preventDefault();
  }

  async function loginchecker(e) {
    let loginmsg = document.getElementById("loginmsg");
    e.preventDefault();
    if (loginoption === "") {
      loginmsg.innerText = "Error! : *** Select Login Option ***";
      loginmsg.style = 'color:red;';
    }
    else {
      try {
        data = await axios.post(`${process.env.REACT_APP_HOST_IP}/${loginoption}login`, {
          uemail: user.uemail,
          upass: user.upass,
        });

        sessionStorage.setItem("token", data?.data?.cookie);
        sessionStorage.setItem("type", data?.data?.type);

        if (data.status === 200) {

          if (loginoption === "user") { // navigate to the user page 
            setloginuser(data?.data?.data);
            setloginrestaurant(null);
            setNavType("user");
            toast.success(data.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            if (location?.state?.fromCart) {
              navigate("/restaurentmenu")
            } else {
              navigate("/")
            }
          }
          else if (loginoption === "mediator") {
            setloginuser(data?.data?.data);
            setloginrestaurant(null);
            setNavType("mediator");
            toast.success(data.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/mediatorhome");
          }
          else {
            setloginrestaurant(data?.data?.data);
            setloginuser(null)
            setNavType("restaurent");
            toast.success(data.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/restaurenthome");
          }

        } else {
          loginmsg.innerText = data.data.message;
          loginmsg.style = 'color:red;';
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <>
      <div className="container">
        <div className="contai">
          <img src={login} alt="loginimage" />
          {/* <img src={reslogin} alt="loginimage"/> */}
        </div>
        <div className="form grid_container login">
          <div className="form-content-login">
            <header>Login</header>

            <div className="flex flex-col gap-y-3">
              <div className="option">
                <div className="restaurent" id="res" onClick={handleRestaurent}>
                  <img className="restaurentlogo" src={restaurentlogo} alt="reslogo" />
                  <span>Restaurant</span>
                </div>
                <div className="user" id="use" onClick={handleUser}>
                  <img className="userlogo" src={userlogo} alt="userlogo" />
                  <span>User</span>
                </div>
              </div>

              <div className="mediator gap-x-5" id="mediator" onClick={handleMediator}>
                <img className="userlogo" src={userlogo} alt="reslogo" />
                <span className="medcls font-bold">Mediator</span>
              </div>

            </div>

            <form onSubmit={loginchecker} className="inside_form">
              <div className="field input-field">
                <input type="email" placeholder="Email" className="input" name="uemail" value={user.uemail} onChange={change} required />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  name="upass" value={user.upass} onChange={change} required
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div className="form-link">
                <Link to="/forgot-password" className="forgot-pass">
                  Forgot password?
                </Link>
              </div>
              <span id="loginmsg"></span>
              <div className="field button-field">
                <button type="submit">Login</button>
              </div>
            </form>

            <div className="form-link">
              <span>
                Don't have an account? {" "}
                <Link to="/signup" className="link signup-link">
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

/*

<div className='main'>
                
                <form onSubmit={loginchecker}>
                    <h1 className='heading'>Login</h1>
                    <div className="login_container">
                        <b>Email :</b>
                        <input type="text" placeholder="Enter Username" name="uemail" value={user.uemail} onChange={change} required />

                        <b>Password :</b>
                        <input type="password" placeholder="Enter Password" name="upass" value={user.upass} onChange={change} required />
                        
                            <a href='/registerrestaurant' id='res'>Register Restaurent</a>
                            <a href='/signup'>Sign up</a>

                            <span id='loginmsg'></span>

                        <button type="submit" className='login_btn'>Login</button>
                    </div>
                </form>
            </div>

* */
