import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='nav px-20 py-7'>
      <nav className='text-white flex'>
        <div>
          <Link to="/" className='pr-8 hover:text-amber-200'>Home</Link>
          <Link to="/about" className='px-8 hover:text-amber-200'>About</Link>
          <Link to="/contact" className='px-8 hover:text-amber-200'>Contact</Link>
        </div>
        <div className='ml-auto'>
            <Link to='/signin' className='navbtn text-sm font-bold'>Sign In</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
