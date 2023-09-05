import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
function PhoneNumber({size}) {
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [valid, setValid] = useState(true);


    const handleChange = (value) => {
        setPhoneNumber(value)
        // setValid(validatePhoneNumber(value))
    }

    // const validatePhoneNumber = (phoneNumber) => {
    //     const pattern = /^\d{12}$/;
    //     return pattern.test(phoneNumber)
    // }

    console.log(phoneNumber);
  return (
    <div>
      <div className='w-full'>
        <PhoneInput
          country={'ph'}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required:true,
            className: 'pl-12 py-2 w-full border border-slate-300 rounded outline-none'
          }}
        />
      </div>
      {/* {!valid &&(
        <p>Invalid phone number</p>
      )} */}
    </div>
  )
}

export default PhoneNumber
