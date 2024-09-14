import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
<<<<<<< HEAD
import Signup from "./pages/SignUp/SignUp";
=======
import Signup from './pages/SignUp/SignUp';
>>>>>>> 8f9c9a78d61785723914bdc9c6e098cd7144852e
const routes = (
  <Router>
    <Routes>
    <Route path="/" exact element={<Login/>}/>
    <Route path="/Signup" exact element={<Signup/>}/>
    <Route path="/dashboard" exact element={<Home/>}/>
      
      
    </Routes>
  </Router>
    
);
const App = () => {
  return <div>{routes}</div>;
}

export default App
