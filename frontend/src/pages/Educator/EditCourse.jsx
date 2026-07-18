import React, { useEffect, useRef, useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { serverurl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';




function EditCourse() {



  const navigate = useNavigate()
  const [isPublished, setisPublished] = useState(false)
  const { courseId } = useParams()
  const [selectCourse, setselectCourse] = useState(null)
  const [title, settitle] = useState("")
  const [subTitle, setsubTitle] = useState("")
  const [description, setdescription] = useState("")
  const [category, setcategory] = useState("")
  const [level, setlevel] = useState("")
  const [price, setprice] = useState("")
  const [frontendimg, setfrontendimg] = useState(img)
  const [backendimg, setbackendimg] = useState(null)
const [loading, setloading] = useState(false)
const [loading1, setloading1] = useState(false)

const dispatch=useDispatch()
const {courseData}=useSelector(state=>state.course)




const handleThumbnail=(e)=>{
  const file=e.target.files[0]
  setbackendimg(file)
  setfrontendimg(URL.createObjectURL(file))

}
  
  
  const thumb = useRef()
const getCourseById=async () => {
  
  try {
    const result=await axios.get(serverurl+`/api/course/getcourse/${courseId}`,{withCredentials:true})
    setselectCourse(result.data)
    console.log(result.data)
  } catch (error) {
    console.log(error)
    
  }
}

useEffect(() => {
  if (selectCourse) {
    settitle(selectCourse.title || "");
    setsubTitle(selectCourse.subTitle || "");
    setdescription(selectCourse.description || "");
    setcategory(selectCourse.category || "");
    setlevel(selectCourse.level || "");
    setprice(selectCourse.price || "");
    setfrontendimg(selectCourse.thumbnail || img);
    setisPublished(selectCourse?.isPublished);
  }
}, [selectCourse]);


useEffect(()=>{
getCourseById()
},[])

const handleEditCourse=async()=>{
  setloading(true)
  const formData=new FormData()
  formData.append("title",title)
  formData.append("subTitle",subTitle)
  formData.append("description",description)
  formData.append("category",category)
  formData.append("level",level)
  formData.append("price",price)
 if (backendimg) {
  formData.append("thumbnail", backendimg);
}
  formData.append("isPublished",isPublished)
  
  try {
    const result=await axios.post(serverurl+`/api/course/editcourse/${courseId}`,formData,{withCredentials:true})
    console.log(result.data)
    const updateData=result.data
    if(updateData.isPublished){
      const updateCourses=courseData.map(c=>c._id===courseId?updateData:c)

      if(!courseData.some(c=>c._id===courseId)){
        updateCourses.push(updateData)
      }
      dispatch(setCourseData(updateCourses))
    }
    else{
 const filterCourses=courseData.filter(c=>c._id!==courseId)
    dispatch(setCourseData(filterCourses))
    }
    setloading(false)
    navigate("/courses")
    toast.success("Course Updated")
    
  } catch (error) {
    console.log(error)
    setloading(false)
    toast.error(error.response.data.message)
    
  }
}


const handleRemoveCourse=async () => {
  setloading1(true)
  try {
    const result=await axios.delete(serverurl+`/api/course/remove/${courseId}`,{withCredentials:true})
    console.log(result.data)
    const filterCourses=courseData.filter(c=>c._id!==courseId)
    dispatch(setCourseData(filterCourses))
    setloading1(false)
    toast.success("Course Removed")
    navigate("/courses")
  } catch (error) {
    console.log(error)
    setloading1(false)
    toast.error(error.response.data.message)
  }
}




  return (
    <div className='max-w-5xl mx-auto p-6 mt-10
     bg-white rounded-lg shadow-md '>

      <div className='flex items-center justify-center gap-[20px]
       md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaLongArrowAltLeft className='top-[-20%] md:top-[20%] absolute left-[0]
    md:left-[2%] w-[22px] h-[22px] cursor-pointer 'onClick={() => navigate("/courses")} />


        <h2 className='text-2xl font-semibold md:pl-[60px]'>
          Add Detail Information Regarding The Course
        </h2>

        <div className='space-x-2 space-y-2'>
          <button onClick={()=>navigate(`/createlecture/${selectCourse?._id}`)} className='bg-black text-white px-4 py-2 rounded-md
  '>
            Go to Lecture Page
          </button>
        </div>
      </div>


      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished ? <button className='bg-green-100 text-gray-600
   px-4 py-2 rounded-md border-1 ' onClick={() => setisPublished(prev => !prev)}>Click to Publish</button> :
            <button className='bg-red-100 text-red-600
   px-4 py-2 rounded-md border-1 '  onClick={() => setisPublished(prev => !prev)}>Click to UnPublish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md' onClick={handleRemoveCourse}>Remove Course</button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
          <div>
            <label htmlFor="title" className='block text-sm font-medium
 text-gray-700 mb-1'>Title</label>
            <input onChange={(e)=>settitle(e.target.value)} value={title} id='title' type="text" className='w-full border px-4
 py-2 rounded-md' placeholder='Course Title' />

          </div>
          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium
 text-gray-700 mb-1'>Subtitle</label>
            <input onChange={(e)=>setsubTitle(e.target.value)} value={subTitle} id='subtitle' type="text" className='w-full border px-4
 py-2 rounded-md' placeholder='Course Subtitle' />

          </div>
          <div>
            <label htmlFor="des" className='block text-sm font-medium
 text-gray-700 mb-1'>Description</label>
            <textarea onChange={(e)=>setdescription(e.target.value)} value={description} id='des' type="text" className='w-full border px-4
 py-2 rounded-md h-24 resize-none' placeholder='Course Description' ></textarea>

          </div>


          <div className='flex flex-col sm:flex-row sm:space-x-4
 space-y-4 sm:space-y-0'>

            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select onChange={(e)=>setcategory(e.target.value)} value={category} className='w-full border px-4 py-2 rounded-md bg-white' name="" id="">

                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>

              </select>
            </div>



            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select onChange={(e)=>setlevel(e.target.value)} value={level} className='w-full border px-4 py-2 rounded-md bg-white' name="" id="">

                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>


              </select>
            </div>



            <div className='flex-1'>
              <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>Course Price (INR)</label>
              <input onChange={(e)=>setprice(e.target.value)} value={price} type="number" name="" id='price' className='w-full border px-4 py-2 rounded-md' placeholder='₹' />
            </div>




          </div>
          <div>


            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
            <input onChange={handleThumbnail} type="file" hidden ref={thumb} accept='image/*' />
          </div>


          <div className='relative w-[300px] h-[170px]'>
            <img className='w-[100%] h-[100%] border-1 border-black rounded-[5px] '
              src={frontendimg} alt="" onClick={() => thumb.current.click()} />
            < MdEdit className='w[20px] h-[20px] absolute top-2 right-2 ' onClick={() => thumb.current.click()} />
          </div>


          <div className='flex items-center justify-start gap-[15px]'>
            <button type='button' className='bg-[#e9e8e8] hover:bg-red-200 text-black
   border-2 border-black cursor-pointer px-4 py-2
   rounded-md
    ' onClick={() => navigate("/courses")}>Cancel</button>
            <button type='button' className='bg-black text-white hover:bg-gray-500 
    cursor-pointer px-7 py-2
    rounded-md
    ' onClick={handleEditCourse} disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:"Save"}</button>
          </div>



        </form>


      </div>

    </div>
  )
}

export default EditCourse
