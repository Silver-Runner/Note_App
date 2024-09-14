import React, { useState } from 'react'
import Passwordinput from '../../components/Input/Passwordinput'
import { Link, useNavigate } from 'react-router-dom'

import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../../components/Navbar/Navbar';

const Signup = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();
    if(!name){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    setError("")
    //signup api

    try{
      const response = await axiosInstance.post("/create-account",{
        fullName: name,
        email: email,
        password: password,
      });
      //handle successfull registration
      if(response.data && response.data.error){
        setError(response.data.message);
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
        navigate('/dashboard');
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
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Signup</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-primary underline">
                Login
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
            <span className="text-white">SignUp with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup
