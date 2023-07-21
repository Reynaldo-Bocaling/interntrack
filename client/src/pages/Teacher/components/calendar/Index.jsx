import React from 'react';
import Calendar from './Calendar';

function Index() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[400px] w-full min-h-[200px] bg-gray-200">
        <div className="p-4">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default Index;
