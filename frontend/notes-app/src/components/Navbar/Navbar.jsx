import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo';
import {useNavigate} from "react-router-dom"
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo,onSearchNotes,handleClearSearch}) => {
  const [searchQuery,setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  }

  const handleSearch = () => {
    if(searchQuery){
      onSearchNotes(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }
  return (
    <div className='bg-white flex items-center justify-between px-2 gap-1 py-2 drop-shadow md:justify-between md:px-6'>
      <h2 className='text-xl font-semibold text-black py-2 text '>Notes</h2>
      {userInfo && (<><SearchBar value={searchQuery}
      onChange={({target}) => {
        setSearchQuery(target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}/>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/></>)}
    </div>
  )
}

export default Navbar
