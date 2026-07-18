import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ai1 from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../components/Card';

function AllCourses() {
    const navigate=useNavigate()
    const {courseData}=useSelector(state=>state.course)

  const [category, setcategory] = useState([])
  const [filterCourses, setfilterCourses] = useState([])
  const [visible, setvisible] = useState(false)
 
const toggleCategory=(e)=>{
  if(category.includes(e.target.value)){
setcategory(prev=>prev.filter(c=>c!==e.target.value))

  }
  else{
  setcategory(prev=>[...prev,e.target.value])
}
}


const applyFilter=()=>{
 let courseCopy=courseData?.slice()
  if(category.length>0){
    courseCopy=courseCopy.filter(c=>category.includes(c.category))
   
  }
   setfilterCourses(courseCopy)
}

useEffect(()=>{
  setfilterCourses(courseData)

},[courseData])

useEffect(()=>{
  applyFilter()
},[category])


  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Nav />

<button className='fixed top-20 left-4 z-50
 bg-white text-black px-3 py-1 rounded md:hidden border-2
  border-black' onClick={()=>setvisible(prev=>!prev)}>
    {visible?"Hide":"Show"}Filters

</button>


{/* sidebar */}

<aside className={`w-[260px] h-screen overflow-y-auto bg-gray-900
 fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md
  transition-transform duration-300 z-5 ${visible?"translate-x-0":"-translate-x-full"} md:block md:translate-x-0`} >



    <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'>
        <FaLongArrowAltLeft className='text-white
            'onClick={()=>navigate("/")} /> Filter By Category</h2>



            <form onSubmit={(e)=>e.preventDefault()} action="" className='space-y-4 text-sm bg-gray-600 border-white
             text-white border p-[20px] rounded-2xl'>

<button className='px-[10px] py-[10px] bg-black text-white
 rounded-[10px] text-[15px] font-light flex items-center 
  justify-center gap-2 cursor-pointer ' onClick={()=>navigate("/search")}>Search with AI <img className='w-[30px] h-[30px] rounded-full  ' src={ai1} alt="" /></button>


  <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input onChange={toggleCategory} value={"App Development"} type="checkbox" className=' accent-black w-4 h-4 rounded-md' />App Development
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={"AI/ML"}/>AI/ML
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={"AI Tools"}/>AI Tools
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={"Data Science"} />Data Science
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={"Data Analytics"}/>Data Analytics
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={"Ethical Hacking"} />Ethical Hacking
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={"UI UX Designing"} />UI/UX Designing
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={"Web Development"} />Web Development
  </label>
   <label htmlFor="" className='flex items-center gap-3 cursor-pointer
   hover:text-gray-200 transition'>
    <input type="checkbox" className=' accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={"Others"} />Others
  </label>

             </form>

</aside>


<main className='w-full transition-all duration-300 py-[130px] md:pl-[300px]
 flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px] '>

{
 filterCourses?.map((course) => (
  <Card
    key={course._id}
    thumbnail={course.thumbnail}
    title={course.title}
    category={course.category}
    price={course.price}
    id={course._id}
    reviews={course.reviews}
  />
))

}
</main>

    </div>
  )
}

export default AllCourses
