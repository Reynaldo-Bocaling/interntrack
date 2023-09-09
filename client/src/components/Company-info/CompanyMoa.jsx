
import React from 'react'
import {TimeIcon } from "../ReactIcon/React-Icons";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import pic from '../../assets/images/task1.jpg'

const  StudentTask = () => {
  
    const navigate = useNavigate();
    const location = useLocation();
    const moa_list = location.state;

   

    return (
      <div>
        <div>
          <h1>MOA</h1>
          
        </div>
        
      </div>
  )
}

export default StudentTask
