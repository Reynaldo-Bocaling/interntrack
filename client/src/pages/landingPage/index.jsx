import React from 'react'
import { Link } from 'react-router-dom'
function index() {
  return (
    <div>
      landing page
      <Link to='/' className='btn bg-blue-500 text-white py-3 px-5'>Get Started</Link>
    </div>
  )
}

export default index
