import React from 'react';
import { Link } from "react-router-dom";


function Home() {
  return (
    <div >

      <div className='con px-16'>
        <div className=''>
          <div className='text-white mt-32 '>
            <h1 className='maintxt text-7xl mb-14 font-extrabold'>UNLOCKING WORLDS <br />  DATA VAULT </h1>
            <p className='mb-12 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ab quas fugiat, <br /> tempore cupiditate laudantium deserunt doloribus nam unde perspiciatis libero <br /> rerum officiis modi aut repellendus ipsa, illum quaerat est!</p>
            <Link to='/Signup' className="button text-white px-6 py-3 " href="">
              <span className="font-bold text-medim text-md">SIGN UP</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
