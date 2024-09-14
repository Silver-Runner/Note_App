import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import AddNotesImg from '../../assets/images/add-notes.svg';
import NoDataImg from '../../assets/images/no-data.svg';
import {MdAdd} from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/Cards/EmptyCard/EmptyCard';
const Home = () => {

  const [openAddEditModel, SetOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null,
  });

  const [showToastMsg, setToastMsg] = useState({
    isShown:false,
    message: "",
    type:"add"
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  
  //handle edit
  const handleEdit = (noteDetails) => {
    SetOpenAddEditModal({isShown: true, data: noteDetails, type: "edit"});
  };

  const showToastMessage = (message, type) => {
    setToastMsg({
      isShown: true, 
      message, 
      type});
  }

  const handleCloseToast = () => {
    setToastMsg({
      isShown: false,
      message: "",
    });
  }

  //get user
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(error){
        localStorage.clear();
        navigate("/login");
    }
  };

  //get all notes
  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    }catch(error){
      console.log("An unexpected error occurred. Please try again");
    }
  }

  //search notes
  const onSearchNotes = async (query) => {
    try{
      const response = await axiosInstance.get("/search-notes", {params: {query},});
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }catch(error){
      console.log(error);
    }
  }

  //pinned status
  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id
    try{
        const response = await axiosInstance.put("/update-note-pinned/" + noteId,{
          isPinned: !noteData.isPinned,
        });
        if(response.data && response.data.note){
          showToastMessage("Note is pinned");
          getAllNotes();
        }
    }catch(error){
      console.log(error);
    }
  }
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  //delete note
  const deleteNote = async(data) => {
    const noteId = data._id;
    try{
      const response = await axiosInstance.delete("delete-note/"+noteId);

      if(response.data && !response.data.error){
        showToastMessage("Note Deleted Successfully","delete");
        getAllNotes();
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        console.log("an unexpected error occurred. Please try again");
      }
    }
  }


  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () =>{};
  },[]);
  

  return (
    <>
    {userInfo ? (<><Navbar userInfo = {userInfo} onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch}/>
    <div className='container mx-auto'>
      {allNotes.length > 0 ? <div className='grid grid-cols-1 gap-4 ml-2 mr-2 mt-8 md:grid-cols-3  '>
      {allNotes.map((item, index) => (
          <NoteCard
          key={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => deleteNote(item)}
          onPinNote={()=> updateIsPinned(item)}/>
      ))}
      
      </div> : <EmptyCard imgScr={isSearch ?NoDataImg : AddNotesImg} message={isSearch ? `Oops! No note found matching your search` : `Start creating your first notes! Click the 'Add' button to jont down your thoughts, ideas and reminders. Let's get started`}/> }
    </div>
    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
      SetOpenAddEditModal({isShown:true,type:"add",data:null});
    }}>
      <MdAdd className="text-[32px] text-white"/>
    </button>
    <Modal 
    isOpen={openAddEditModel.isShown}
    onRequestClose={() => {}}
    style={{
      overlay:{
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    }}
    contentLabel=""
    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-hidden ">
    <AddEditNotes 
    type={openAddEditModel.type}
    noteData={openAddEditModel.data}
    onClose={() => {
      SetOpenAddEditModal({isShown:false,type:"add",data:null});
    }} getAllNotes={getAllNotes}
    showToastMessage={showToastMessage}
    />
    </Modal>
    <Toast isShown = {showToastMsg.isShown}
    message = {showToastMsg.message}
    type = {showToastMsg.type}
    onClose={handleCloseToast}/></>) : "Error"}
    </>
  )
}

export default Home
