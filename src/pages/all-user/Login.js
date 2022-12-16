import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { InfoIcon } from "../../assets/icons/icon-svg/iconSvg";
import { loginUser } from "../../features/product/productSlice";

const Login = () => {
  const { isLoading } = useSelector((store) => store.product);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      setError(false);
      dispatch(loginUser({ username, password, redirect, notFound }));
    }
  };

  const redirect = (status) => {
    if (status.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const notFound = (status) => {
    setError(true);
    navigate("/login");
  };

  return (
    <section id="login">
      <div
        className="w-full h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1557944697-7c532ac293a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80")` }}
      >
        <div className="w-full h-screen bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div
            className="w-2/3 bg-white bg-cover rounded-xl overflow-hidden flex place-content-end"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1557944697-7c532ac293a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80")` }}
          >
            <form onSubmit={handleLogin} className="w-full lg:w-1/2 flex flex-col justify-between px-5 py-10 lg:px-7 text-primary bg-primaryLight">
              <h1 className="font-bold text-primary text-center text-xl md:text-2xl">Login</h1>
              <div className="py-14">
                <label htmlFor="username" className="font-semibold text-base md:text-lg">
                  Username
                </label>
                <input type="text" onChange={handleUsername} value={username} className="w-full bg-primaryLight border-b-2 outline-none mb-3" />
                <label htmlFor="password" className="font-semibold text-base md:text-lg">
                  Password
                </label>
                <input type="password" onChange={handlePassword} value={password} className="w-full bg-primaryLight border-b-2 outline-none" />
                <div className="w-full py-4 text-red-500 italic capitalize tracking-wide text-base">{empty && <p>Please fill in the login form first</p>}</div>
                <div className="w-full py-4 text-red-500 italic capitalize tracking-wide text-base">{error && <p>The username or password you entered is incorrect</p>}</div>
                <div className="flex justify-end opacity-50 transition ease-in-out hover:opacity-100 relative">
                  <div className="group">
                    <InfoIcon />
                    <div className="text-white text-base bg-sky-700 absolute -top-20 right-0 p-4 rounded-md hidden group-hover:block transition ease-in-out duration-200">
                      <h5>Username : mor_2314</h5>
                      <h5>Password : 83r5^_</h5>
                    </div>
                  </div>
                </div>
                {isLoading && <h1>loading...</h1>}
              </div>
              <div className="flex justify-end items-center">
                <Link to="/" className="px-7 py-1 mr-5 text-sm md:text-base rounded-full text-primary transition duration-200 hover:bg-blueButton hover:text-primaryLight capitalize">
                  Back
                </Link>
                <button className="px-7 py-1 text-sm md:text-base bg-blueButton brightness-110 rounded-full text-primaryLight transition duration-100 hover:brightness-100 capitalize">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
