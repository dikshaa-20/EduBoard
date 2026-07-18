import axios from 'axios';
import React, { useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverurl } from '../../App';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function EditLecture() {
  const { courseId, lectureId } = useParams()
  const { lectureData } = useSelector(state => state.lecture)
  const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
const [lectureTitle, setlectureTitle] = useState(selectedLecture.lectureTitle)
const [videoUrl, setvideoUrl] = useState("")
const [isPreviewfree, setisPreviewfree] = useState(false)
const [loading, setloading] = useState(false)
const dispatch=useDispatch()
const [loading1, setloading1] = useState(false)
  const navigate = useNavigate()
  const formdata=new FormData()
  formdata.append("lectureTitle",lectureTitle)
  formdata.append("videoUrl",videoUrl)
  formdata.append("isPreviewFree",isPreviewfree)

  const handleEditLecture=async()=>{
    setloading(true)
    try {
      const result=await axios.post(serverurl+`/api/course/editlecture/${lectureId}`,formdata,{withCredentials:true})
      console.log(result.data)
      dispatch(setLectureData([...lectureData,result.data]))
      toast.success("Lecture updated")
      setloading(false)
      navigate("/courses")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setloading(false)
    }
  }


 
   const removeLecture=async () => {

    setloading1(true)
    try {
      const result=await axios.delete(serverurl+`/api/course/removelecture/${lectureId}`,{withCredentials:true})
      console.log(result.data)
      setloading1(false)
      navigate(`/createlecture/${courseId}`)
      toast.success("Lecture Removed")
      
    } catch (error) {
      setloading1(false)
      console.log(error)
      toast.error(error.response.data.message)
    }
     
   }
   



  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center
     p-4'>

      <div className='w-full max-w-xl bg-white rounded-xl
       shadow-lg p-6 space-y-6'>

        <div className='flex items-center gap-2 mb-2'>
          <FaLongArrowAltLeft className='text-gray-600 cursor-pointer'
            onClick={() => navigate(`/createlecture/${courseId}`)} />
          <h2 className='text-xl font-semibold text-gray-800'>
            Update Course Lecture
          </h2>
        </div>

        <button onClick={removeLecture} className='mt-2 px-4 py-2 bg-red-600
         text-white rounded-md hover:bg-red-700 transition-all text-sm'disabled={loading1}>
{loading1 ? (
    <ClipLoader size={30} color="white" />
  ) : (
    "Remove Lecture"
  )}
          </button>

        <div className='space-y-4'>

          <div >
            <label className='block text-sm font-medium
                text-gray-700 mb-1' htmlFor="">Lecture Title *</label>
            <input onChange={(e)=>setlectureTitle(e.target.value)} value={lectureTitle} type="text" className='w-full p-3 border border-gray-300 rounded-md text-sm
                focus:ring-black focus:outline-none' required />
          </div>

          <div>
            <label className='block text-sm font-medium
                text-gray-700 mb-1' htmlFor="">Video *</label>
            <input onChange={(e)=>setvideoUrl(e.target.files[0])} type="file" className='w-full border border-gray-300 rounded-md
             p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm
              file:bg-gray-700 file:text-white hover:file:bg-gray-500' required accept='video/*'/>

          </div>

          <div className='flex items-center gap-3'>
            <input onChange={()=>setisPreviewfree(prev=>!prev)} type="checkbox" className='accent-black h-4 w-4' id='isFree'/>
            <label  htmlFor="isFree" className='text-sm text-gray-700'>Is this Video FREE</label>

          </div>
          {loading ? <p>Uploading Video... Please Wait.</p>:""}

        </div>

        <div className='pt-4'>
          <button onClick={handleEditLecture} className='w-full bg-black text-white
           rounded-md text-sm font-medium hover:bg-gray-700
            transition py-3' disabled={loading}>
{loading ? (
    <ClipLoader size={30} color="white" />
  ) : (
    "Update Lecture"
  )}
          </button>

        </div>

      </div>


    </div>
  )
}

export default EditLecture
