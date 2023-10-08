import React from 'react'
import StudentInfo from '../../components/Company-info/index'
import { useQuery } from '@tanstack/react-query'
import { getCompanyList } from '../../api/Api'
import { useParams } from 'react-router-dom'

const ViewCompany = () =>  {

  const {id} = useParams();
  const {
    data, 
    isLoading,
    isError
  } = 
  useQuery({
    queryKey: ['companyInfo'],
    queryFn: getCompanyList
  })

  const companyInfo = data ? 
  data.find((item)=> item.id == parseInt(id))
  : []


  return (
    <div>
      <StudentInfo data={companyInfo} editable={true} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default ViewCompany
