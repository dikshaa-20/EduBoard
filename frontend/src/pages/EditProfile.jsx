import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverurl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function EditProfile() {
    const navigate=useNavigate()
    const {userData}=useSelector(state=>state.user)
const [name, setname] = useState(userData.name || "")
const [description, setdescription] = useState(userData.description || "")
const [photoUrl, setphotoUrl] = useState(null)
const [loading, setloading] = useState(false)
const dispatch=useDispatch()

const formData=new FormData()
formData.append("name",name)
formData.append("description",description)
formData.append("photoUrl",photoUrl)


const handleEditProfile=async()=>{
  setloading(true)
  try {
    const result=await axios.post(serverurl+"/api/user/profile",formData,{withCredentials:true})
    dispatch(setUserData(result.data))
    setloading(false)
    navigate("/profile")
    toast.success("Profile Updated")
  } catch (error) {
    setloading(false)
    console.log(error)
    toast.error(error.response.data.message)
  }
}




  return (
    <div className='min-h-screen flex items-center
    justify-center bg-gray-100 px-4 py-10 '>
      <div className='bg-white rounded-2xl shadow-lg
      p-8 max-w-xl w-full relative'>

<FaLongArrowAltLeft className='absolute
 top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer 'onClick={()=>navigate("/profile")} />
 <h2 className='text-2xl font-bold text-center text-gray-800
 mb-6'>Edit Profile</h2>
 <form onSubmit={(e)=>e.preventDefault()} action="" className='space-y-5'>
<div className="flex flex-col items-center justify-center">
  {photoUrl || userData?.photoUrl ? (
    <img
      src={photoUrl ? URL.createObjectURL(photoUrl) : userData.photoUrl}
      className="w-24 h-24 rounded-full object-cover border-4 border-black"
      alt="Profile"
    />
  ) : (
    <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
      {userData?.name?.charAt(0).toUpperCase()}
    </div>
  )}
</div>

<div>
    <label htmlFor="image" className='text-sm font-medium text-gray-700'>Select Avatar</label>
    <input onChange={(e)=>setphotoUrl(e.target.files[0])} className='w-full px-4 py-2 border rounded-md text-sm' id='image'
    name='photoUrl'
    placeholder='PhotoUrl'
    accept='image/*'
    type="file" />
</div>

<div>
    <label htmlFor="name" className='text-sm font-medium text-gray-700'>UserName</label>
    <input className='w-full px-4 py-2 border rounded-md text-sm' id='name'
    onChange={(e)=>setname(e.target.value)}
    placeholder={userData.name}
    value={name}
    type="text" />
</div>

<div>
    <label  className='text-sm font-medium text-gray-700'>Email</label>
    <input readOnly className='w-full px-4 py-2 border rounded-md text-sm' id='email'
    
    placeholder={userData.email}
    
    type="text" />
</div>
<div>
    <label htmlFor="bio" className='text-sm font-medium text-gray-700'>Bio</label>
    <textarea className='w-full mt-1 text-sm px-4 py-2 border border-gray-300 resize-none rounded-md
    focus:ring-2 focus:ring-black' id='name'
    rows={3}
    name='description'
    placeholder="Tell About Yourself"
    value={description}
       onChange={(e)=>setdescription(e.target.value)}
     />
</div>
<button
  onClick={handleEditProfile}
  className="w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer"
  disabled={loading}
>
  {loading ? (
    <ClipLoader size={20} color="white" />
  ) : (
    "Save Changes"
  )}
</button>
 </form>

      </div>
    </div>
  )
}

export default EditProfile
