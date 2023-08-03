import React, { useState } from 'react'
import { UserData } from './ChartData';
import LineChart from './LineChart';
import PieChart from './PieChart';
function index() {

     

    

  return (
    <div>
     <div className='min-w-[400px]'>
        <LineChart chartData={userData} />
        <PieChart chartData={userData} />
      </div>
    </div>
  )
}

export default index
