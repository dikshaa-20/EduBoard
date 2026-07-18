import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { serverurl } from '../App'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function ForgetPassword() {
    const [step, setstep] = useState(1)
    const navigate=useNavigate()

    const [email, setemail] = useState("")
    const [otp, setotp] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [conpassword, setconpassword] = useState("")
    const [loading, setloading] = useState(false)

const sendOtp=async () => {
  setloading(true)
  try {
    const result=await axios.post(serverurl+"/api/auth/sendotp",{email},{withCredentials:true})
   console.log(result.data)
   setstep(2)
   toast.success(result.data.message)
    setloading(false)
   
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    setloading(false)
  }
}




const verifyOTP=async()=>{
   setloading(true)
   try {
      const result=await axios.post(serverurl+"/api/auth/verifyotp",{email,otp},{withCredentials:true})
      console.log(result.data)
   setstep(3)
   toast.success(result.data.message)
    setloading(false)
   } catch (error) {
      console.log(error)
    toast.error(error.response.data.message)
    setloading(false)
   }
}



const resetPassword=async()=>{
   setloading(true)
   try {
      if (newpassword !== conpassword) {
   toast.error("Passwords do not match")
   setloading(false)
   return
}
      const result=await axios.post(serverurl+"/api/auth/resetpassword",{email,password:newpassword},{withCredentials:true})
      console.log(result.data)
   setloading(false)
   toast.success(result.data.message)
    navigate("/login")
   } catch (error) {
   console.log(error)

   toast.error(
      error.response?.data?.message || "Something went wrong"
   )

   setloading(false)
}
}



  return (
    <div className='min-h-screen flex items-center justify-center 
    bg-gray-100 px-4'>
      
      {/* step1 */}

      {step==1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>

  <h2 className='text-2xl font-bold mb-6 text-center
   text-gray-800'>Enter OTP</h2>

   <form onSubmit={(e)=>e.preventDefault()} className='space-y-4'>

<div>
    <label htmlFor="email" className='block text-sm 
    font-medium text-gray-700'>Enter Your Email Address</label>
    <input value={email} onChange={(e)=>setemail(e.target.value)} required id='email' placeholder='you@example.com' type="text" 
    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md 
    shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] '/>
</div>
<button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md 
font-medium cursor-pointer ' disabled={loading} onClick={sendOtp}>{loading? <ClipLoader size={30} color='white'/>:"Send OTP"}</button>

   </form>


   <div className='text-sm text-center font-semibold cursor-pointer mt-4' onClick={()=>navigate("/login")}>
Back to Login
   </div>


      </div>}

      {/* step2 */}

      {step==2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>

  <h2 className='text-2xl font-bold mb-6 text-center
   text-gray-800'>Enter OTP</h2>

   <form onSubmit={(e)=>e.preventDefault()}  className='space-y-4'>

<div>
    <label htmlFor="otp" className='block text-sm 
    font-medium text-gray-700'>Please enter your 4-digit code send to your email</label>
    <input value={otp} onChange={(e)=>setotp(e.target.value)} required id='otp' placeholder='* * * *' type="text" 
    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md 
    shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] '/>
</div>
<button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md 
font-medium cursor-pointer ' disabled={loading} onClick={verifyOTP}>{loading?<ClipLoader size={30} color='white'/>:"Verify OTP"}</button>

   </form>


   <div className='text-sm text-center font-semibold cursor-pointer mt-4' onClick={()=>navigate("/login")}>
Back to Login
   </div>


      </div>}

      {/* step3 */}

      {step==3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>

  <h2 className='text-2xl font-bold mb-6 text-center
   text-gray-800'>Reset Your Password</h2>

   <p className='text-sm text-gray-500 text-center mb-6'>
    Enter a new password below to regain access to your account
   </p>

   <form onSubmit={(e)=>e.preventDefault()} className='space-y-4'>

<div>
    <label htmlFor="password" className='block text-sm 
    font-medium text-gray-700'>New Password</label>
    <input value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} required id='password' placeholder='**********' type="password" 
    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md 
    shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] '/>
</div>

<div>
    <label htmlFor="conpassword" className='block text-sm 
    font-medium text-gray-700'>Confirm Password</label>
    <input value={conpassword} onChange={(e)=>setconpassword(e.target.value)} required id='conpassword' placeholder='**********' type="password" 
    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md 
    shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] '/>
</div>
<button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md 
font-medium cursor-pointer ' onClick={resetPassword}>{loading?<ClipLoader size={30} color='white'/>:"Reset Password"}</button>

   </form>


   <div className='text-sm text-center font-semibold cursor-pointer mt-4' onClick={()=>navigate("/login")}>
Back to Login
   </div>


      </div>}


    </div>
  )
}

export default ForgetPassword
