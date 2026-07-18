import axios from 'axios'
import React, { useEffect } from 'react'
import { serverurl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'

const getAllReviews = () => {
     const dispatch=useDispatch()
  useEffect(()=>{
const allReviews=async () => {
    try {
        const result=await axios.get(serverurl+"/api/review/getreview",{withCredentials:true})
       dispatch(setReviewData(result.data))
       console.log(result.data)


    } catch (error) {
        console.log(error)
    }
  
}
allReviews()

  },[])
}

export default getAllReviews
