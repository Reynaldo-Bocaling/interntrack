import React from 'react'

function Fourth() {
    const colleges = [
        {
          college_id: 1,
          college_desc: "College of Engineering",
          programs: [
            {
              prog_id: 101,
              prog_desc: "Computer Science",
              majors: [
                {
                  major_id: 201,
                  major_desc: "Software Engineering"
                },
                {
                  major_id: 202,
                  major_desc: "Data Science"
                }
              ]
            },
            {
              prog_id: 102,
              prog_desc: "Electrical Engineering",
              majors: [
                {
                  major_id: 203,
                  major_desc: "Power Systems"
                },
                {
                  major_id: 204,
                  major_desc: "Electronics"
                }
              ]
            }
          ]
        },
        {
          college_id: 2,
          college_desc: "College of Business",
          programs: [
            {
              prog_id: 103,
              prog_desc: "Marketing",
              majors: [
                {
                  major_id: 205,
                  major_desc: "Digital Marketing"
                },
                {
                  major_id: 206,
                  major_desc: "Finance"
                }
              ]
            }
          ]
        }
      ];

  return (
    <div>
      fd
    </div>
  )
}

export default Fourth
