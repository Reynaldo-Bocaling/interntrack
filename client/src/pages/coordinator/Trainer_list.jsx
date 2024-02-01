import React, { lazy } from 'react'
const TrainerList = lazy(()=> import('../../components/trainer-list/TrainerList'));


const Trainer_list = () => {
  return (
    <>
      <TrainerList />
    </>
  )
}

export default Trainer_list
