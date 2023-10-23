import React from 'react'
import pic from "../../assets/images/task1.jpg";
import { Link } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
function UnOrderedListStyle() {
  return (
    <div className='mt-7'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* start */}

        <div className='flex flex-col gap-3'>
          <small className='w-[80px] pl-2 text-base border-b-[1.2px] pb-2 border-blue-500'>January</small>
          <Carousel slideSize="70%"  align="start" slideGap="xs" controlsOffset="xs" withIndicators>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>

          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>
          </Carousel.Slide>

          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          
        </Carousel>
        </div>
        <div className='flex flex-col gap-3'>
          <small className='w-[80px] pl-2 text-base border-b-[1.2px] pb-2 border-blue-500'>February</small>
          <Carousel slideSize="70%"  align="start" slideGap="xs" controlsOffset="xs" withIndicators>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>

          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>
          </Carousel.Slide>

          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          
        </Carousel>
        </div>
        <div className='flex flex-col gap-3'>
          <small className='w-[80px] pl-2 text-base border-b-[1.2px] pb-2 border-blue-500'>March</small>
          <Carousel slideSize="70%"  align="start" slideGap="xs" controlsOffset="xs" withIndicators>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>

          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>
          </Carousel.Slide>

          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          
        </Carousel>
        </div>
        <div className='flex flex-col gap-3'>
          <small className='w-[80px] pl-2 text-base border-b-[1.2px] pb-2 border-blue-500'>April</small>
          <Carousel slideSize="70%"  align="start" slideGap="xs" controlsOffset="xs" withIndicators>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>

          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
            <div className="mb-5">
              <h1 className="text-base font-semibold tracking-wide">
                Coding in CICT office
              </h1>
              <small className="text-blue-500 font-medium tracking-wide">
                Task
              </small>
            </div>
            <img
              className="w-full h-40 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex justify-between mt-7 px-2">
              <span className="text-gray-405 tracking-wide text-sm">
                August 20, 2023
              </span>
              <Link className="text-blue-500 text-sm font-medium tracking-wide">
                View
              </Link>
            </div>
          </div>
          </Carousel.Slide>

          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="card-group bg-white p-4 rounded-lg drop-shadow-md">
          <div className="mb-5">
            <h1 className="text-base font-semibold tracking-wide">
              Coding in CICT office
            </h1>
            <small className="text-blue-500 font-medium tracking-wide">
              Task
            </small>
          </div>
          <img
            className="w-full h-40 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"ds"}
          />
          <div className="flex justify-between mt-7 px-2">
            <span className="text-gray-405 tracking-wide text-sm">
              August 20, 2023
            </span>
            <Link className="text-blue-500 text-sm font-medium tracking-wide">
              View
            </Link>
          </div>
        </div>
          </Carousel.Slide>
          
        </Carousel>
        </div>


        

        

  
        </div>
    </div>
  )
}

export default UnOrderedListStyle
