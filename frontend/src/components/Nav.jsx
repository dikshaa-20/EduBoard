import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { IoPersonCircleSharp } from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { serverurl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
function Nav()  {

  const {userData}=useSelector(state=>state.user)
  const navigate=useNavigate()
const dispatch=useDispatch()

const [show, setshow] = useState(false)
const [showham, setshowham] = useState(false)

  const handlelogout=async()=>{
    try {
      const result=await axios.get(serverurl+"/api/auth/logout",{withCredentials:true})
dispatch(setUserData(null))
console.log(result.data)
toast.success("Logout successfully")
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>

        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#000000] z-10 '>
  <div className='lg:w-[20%] w-[40%] lg:pl-[50px] '>
    <img src={logo} alt="" className='w-[50px] h-[50px] rounded-full
     border-2 border-white cursor-pointer ' />
  </div> 


  <div className='w-auto  lg:flex items-center
  justify-center gap-4 hidden'>
{!userData && <IoPersonCircleSharp className='w-[50px] h-[50px] fill-white cursor-pointer  ' onClick={()=>setshow(prev=>!prev)}/>}


{userData?.photoUrl ? <img src={userData?.photoUrl} 
className='w-[50px] h-[50px] rounded-full text-black flex items-center justify-center
text-[20px] border-2 bg-white border-white cursor-pointer ' onClick={()=>setshow(prev=>!prev)}/>
 : <div className='w-[50px] h-[50px] rounded-full text-black flex items-center justify-center
text-[20px] border-2 bg-white border-white cursor-pointer ' onClick={()=>setshow(prev=>!prev)}>
{userData?.name.slice(0,1).toUpperCase()}
</div>}


{userData?.role==="educator" && <div className='px-[20px] py-[10px] border-2
border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer ' onClick={()=>navigate("/dashboard")}
 >Dashboard</div>}

{!userData? <span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light
 cursor-pointer bg-[#000000d5]
  ' onClick={()=>navigate("/login")}>
    Login
 </span>:
 <span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light
 cursor-pointer bg-[#000000d5]
  ' onClick={handlelogout}>
    Logout
 </span>}

 {show && <div className='absolute top-[110%] right-[15%] flex items-center justify-center flex-col gap-2 text-[16px]
  rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white
   cursor-pointer hover:bg-black '>
<span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=>navigate("/profile")}>My Profile</span>
<span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=>navigate("/mycourses")}>My Courses</span>

 </div>}


  </div>
   <GiHamburgerMenu onClick={()=>setshowham(prev=>!prev)} className='w-[30px] m-2 h-[30px] lg:hidden fill-white cursor-pointer '/>

   <div className={`fixed top-0 w-[100vw] left-0 h-[100vh] bg-[#000000d6] flex items-center
    justify-center flex-col gap-5 z-10 lg:hidden
     ${showham?"translate-x-0 transition duration-600":"translate-x-[-100%] transition duration-600  "} `}>


<ImCross className='w-[20px] h-[20px] fill-white absolute top-5 right-[4%] ' onClick={()=>setshowham(prev=>!prev)}  />
{!userData && <IoPersonCircleSharp className='w-[50px] h-[50px] fill-white cursor-pointer  ' />}


{userData?.photoUrl ? <img src={userData?.photoUrl} 
className='w-[50px] h-[50px] rounded-full text-black flex items-center justify-center
text-[20px] border-2 bg-white border-white cursor-pointer '/>
 : <div className='w-[50px] h-[50px] rounded-full text-black flex items-center justify-center
text-[20px] border-2 bg-white border-white cursor-pointer ' onClick={()=>setshow(prev=>!prev)}>
{userData?.name.slice(0,1).toUpperCase()}
</div>}

{userData?.role==="educator" && <div className='w-[200px] h-[65px] flex items-center justify-center border-2
border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer '
onClick={()=>navigate("/profile")}
 >My Profile</div>}
 {userData?.role==="educator" && <div className='w-[200px] h-[65px] flex items-center justify-center border-2
border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer '
onClick={()=>navigate("/mycourses")}
 >My Courses</div>}
 
{userData?.role==="educator" && <div className='w-[200px] h-[65px] flex items-center justify-center border-2
border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer '
onClick={()=>navigate("/dashboard")}
 >Dashboard</div>}

 {!userData? <span className='w-[200px] h-[65px] flex items-center justify-center border-2
border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer ' onClick={()=>navigate("/login")}>
    Login
 </span>:
 <span className='w-[200px] h-[65px] flex items-center justify-center border-2
border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer ' onClick={handlelogout}>
    Logout
 </span>}


   </div>
        </div>
      
    </div>
  )
}

export default Nav
