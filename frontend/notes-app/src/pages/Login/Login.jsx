import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Passwordinput from '../../components/Input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'


import Navbar from '../../components/Navbar/Navbar'

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) =>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter a Valid Email");
      return ;
    }
    if(!password){
      setError("Please Enter a Password");
      return ;
    }
    setError("")
    //login api call
    try{
      const response = await axiosInstance.post("/login",{
        email: email,
        password: password,
      });
      //handle successfull login 
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
        navigate('/dashboard')
      }

    }catch(error){
      //handle login error
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred. please try again");
      }
    }
    
  }
  return (
    <>
      <Navbar/>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10 drop-shadow">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
          <div className="flex flex-col mt-5 items-center justify-between ">
            <div className="flex items-center w-full">
              <hr className="w-full border-t-1 border-gray-300" />
              <span className="px-3 text-gray-500">OR</span>
              <hr className="w-full border-t-1 border-gray-300" />
            </div>
          </div>
          <button className="flex items-center mt-5 btn-primary justify-center gap-2">
            <img
              className="w-6 h-6  rounded-full"
              src="google.png"
              alt="Google Logo"
            />
            <span className="text-white">Login with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Login
