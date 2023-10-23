import React from 'react';
import { Carousel } from '@mantine/carousel';

const TaskCarousel = ({ month, tasks }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
    return (
    <div className="flex flex-col gap-3 mt-5">
      <small className="w-[80px] pl-2 text-base border-b-[1.2px] pb-2 border-blue-500">
      {monthNames[parseInt(month, 10) - 1]}
      </small>
      <Carousel slideSize="70%" align="start" slideGap="xs" controlsOffset="xs" withIndicators>
        {tasks.map((task, index) => (
          <Carousel.Slide key={index}>
            <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
              <div className="mb-5">
                <h1 className="text-base font-semibold tracking-wide">
                  {task.description}
                </h1>
                <small className="text-blue-500 font-medium tracking-wide">Task</small>
              </div>
              <img
                className="w-full h-40 object-cover object-center mb-2 rounded-lg"
                src={task.tasImageUrl}
                alt={task.description}
              />
              <div className="flex justify-between mt-7 px-2">
                <span className="text-gray-405 tracking-wide text-sm">{task.date}</span>
                <a href="#" className="text-blue-500 text-sm font-medium tracking-wide">
                  View
                </a>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default TaskCarousel;
