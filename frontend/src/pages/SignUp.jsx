import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { IoMdEye } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import google from "../assets/google.jpg"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { serverurl } from '../App';
import {ClipLoader} from 'react-spinners'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';
function SignUp() {
    const [show, setshow] = useState(false)
    const navigate=useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const dispatch=useDispatch()
const [role, setrole] = useState("student")

const handlesignup=async () => {
  setloading(true)
  try {
    const result=await axios.post(serverurl+"/api/auth/signup",{name,password,email,role},{withCredentials:true})
    dispatch(setUserData(result.data))
    setloading(false)
    navigate("/")
    toast.success("SignUp Successfully")
  } catch (error) {
    console.log(error)
    setloading(false)
    toast.error(error.response.data.message)
  }
}


const googleSignUp=async () => {
  try {
    const response=await signInWithPopup(auth,provider)
    let user=response.user
    let name=user.displayName
    let email=user.email

const result=await axios.post(serverurl+"/api/auth/googleauth",{name,email,role},{withCredentials:true})
 dispatch(setUserData(result.data))
    
    navigate("/")
    toast.success("SignUp Successfully")
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}





  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex 
    items-center justify-center  '>
      <form onSubmit={(e)=>e.preventDefault()} className='w-[90%] md:w-200 h-135 bg-white
       shadow-xl rounded-2xl flex relative '>
               <FaLongArrowAltLeft onClick={()=>navigate("/")} className='absolute 
                  top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer '/>
<div className='md:w-[50%] w-[100%] h-[100%]
 flex flex-col items-center justify-center gap-3  '>

<div>
  <h1 className='font-semibold text-2xl'>Let's Get Started</h1>
<h2 className='text-[#999797] text-[18px] '>Create Your Account</h2>
</div>


<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>

  <label htmlFor="name" className='font-semibold'>Name</label>
  <input onChange={(e)=>setname(e.target.value)} value={name} id='name' type="text" placeholder='Your Name' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]  ' />
</div>
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>

  <label htmlFor="email" className='font-semibold'>Email</label>
  <input onChange={(e)=>setemail(e.target.value)} value={email} id='email' type="text" placeholder='Your Email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]  ' />
</div>
<div className='flex relative flex-col gap-1 w-[80%] items-start justify-center px-3 '>

  <label htmlFor="name" className='font-semibold'>Password</label>
  <input onChange={(e)=>setpassword(e.target.value)} value={password} id='password' type={show?"text":"password"} placeholder='Your Password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]  ' />
  {!show ?< MdOutlineRemoveRedEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] ' onClick={()=>setshow(prev=>!prev)}/>:
  <IoMdEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] ' onClick={()=>setshow(prev=>!prev)} />}
</div>

<div className='flex md:w-[50%] w-[70%] items-center justify-between '>
<span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer 
hover:border-black ${role==="student"?"border-black":"border-[#646464]"}  `} onClick={()=>setrole("student")}>Student</span>

<span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer 
hover:border-black ${role==="educator"?"border-black":"border-[#646464]"}  `} onClick={()=>setrole("educator")}>Educator</span>
</div>


  <button className='w-[60%] h-[40px] bg-black text-white
  cursor-pointer flex items-center justify-center rounded-[5px]  'onClick={handlesignup} disabled={loading}>
{loading? <ClipLoader size={30} color='white'/>:"SignUp"}
  </button>

  <div className='w-[80%] flex items-center justify-center gap-2 '>
<div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
<div className='w-[50%] text-[15px] text-[#6f6f6f] 
flex items-center justify-center '>Or continue with</div>
<div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
  </div>

  <div className='w-[80%] h-[40px] border-1 border-black
   rounded-[5px] flex items-center justify-center ' onClick={googleSignUp}>
<img src={google} className='w-[25px]' alt="" />
<span className='text-[18px] text-gray-500  '>oogle</span>
  </div>


  <div className='text-[#6f6f6f]'>already have an account?
    <span onClick={()=>navigate("/login")} className='underline underline-offset-1 cursor-pointer text-black'> Login </span>
  </div>


</div>





<div className='w-[50%] h-[100%] rounded-r-2xl  bg-black md:flex items-center justify-center flex-col hidden '>


<img src={logo} alt="logo" className='w-30 h-30 rounded-full shadow-2xl'/>
<span className='text-2xl text-white'>EduBoard</span>
</div>

      </form>
    </div>
  )
}

export default SignUp
