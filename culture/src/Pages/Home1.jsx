import React from 'react'
import { Link } from 'react-router-dom';


function Home1() {
  return (
    <div className='Home1'>
      
       <div className='flex h-screen justify-center items-center flex-col  '>
        <h1 className='font-bold text-7xl text-sky-950 mb-8'>Discover Global Traditions</h1>
        <Link to='/Dataset' className='btn w-56 h-12 text-center leading-10 mt-10 mb-8 font-bold text-xl text-white '>Explore</Link>
        <div>

        </div>
       </div>
    </div>
  )
}

export default Home1