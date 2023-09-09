import React from 'react'
import CustomAutocomplete from '../SelectCompany/SelectCompany';
function SelectCompanyTrainer(props) {
    const {
        selectedCompany,
        setSelectedCompany,
        selectedTrainer,
        setSelectedTrainer,
        selectedAreaOfAssignment,
        setSelectedAreaOfAssignment,
        onCLickAssign,
        companies
    } = props;


    const filteredTrainers =
    selectedCompany ? selectedCompany.trainers : [];
  const filteredAreasOfAssignment =
    selectedCompany ? selectedCompany.areasOfAssignment : [];

 
    const handleCompanyChange = (event, newValue) => {
        setSelectedCompany(newValue);
        setSelectedAreaOfAssignment(null); // Reset selected area
        setSelectedTrainer(null); // Reset selected trainer
      };
    
      const handleTrainerChange = (event, newValue) => {
        setSelectedTrainer(newValue);
      };
    
      const handleAreaChange = (event, newValue) => {
        setSelectedAreaOfAssignment(newValue);
      };

   

      // const newData = 
      //   {
      //     company2: com
      //   }
      
   
      // const handleAddStudent = () => {
      //   const data2 = [
      //     {company: selectedCompany.name},
      //     {trainer: selectedTrainer.name},
      //     {area: selectedAreaOfAssignment.name},
      //   ]
      //   console.log([data2, ...]);
      // };

      return (
        <div className='p-5 flex flex-col gap-3'>
          <div className='flex gap-3'>
            <CustomAutocomplete
              size={'w-[50%]'}
              options={companies}
              label="Choose a Company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              
            />
    
            <CustomAutocomplete
              size={'w-[50%]'}
              options={filteredTrainers}
              label="Choose a Trainer"
              value={selectedTrainer}
              onChange={handleTrainerChange}
              disabled={!selectedCompany}
            />
          </div>
    
          <div className='flex items-center gap-5'>
            <CustomAutocomplete
              size={'w-[85%]'}
              options={filteredAreasOfAssignment}
              label="Choose an Area of Assignment"
              value={selectedAreaOfAssignment}
              onChange={handleAreaChange}
              disabled={!selectedCompany}
            />
           {selectedAreaOfAssignment && (
  <p>Available Slots for {selectedAreaOfAssignment.name}: {selectedAreaOfAssignment.slots}</p>
)}

    
            <button
            onClick={onCLickAssign}
              className='w-[15%] bg-blue-500 py-3 px-5 rounded-lg text-white'
            >
              Assign
            </button>
          </div>
        </div>
      );
}

export default SelectCompanyTrainer
