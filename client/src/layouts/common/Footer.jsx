import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
  return (
   <footer className='mt-7'>
    <p className='text-sm text-gary-600 text-center tracking-wider pb-1'>&copy; 2023 <Link to="/"  className='font-semibold text-black hover:underline'>InternTrack</Link >. All Rights Reserved.</p>
    <p className='text-sm text-gary-600 text-center tracking-wider'>Terms of Use | Privacy Policy | Contact Us</p>
   </footer>
  )
}

export default Footer
