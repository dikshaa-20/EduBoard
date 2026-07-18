import axios from 'axios'
import React, { useEffect } from 'react'
import { serverurl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const getCurrentUser = () => {
    const dispatch=useDispatch()
useEffect(()=>{
    const fetchUser=async()=>{
        try {
            const result=await axios.get(serverurl + "/api/user/getcurrentuser", {
  withCredentials: true,
});
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }
    fetchUser()
},[])
}

export default getCurrentUser
