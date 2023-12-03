import React from 'react';
import SpaceX from '../../assets/spacex.jpg';

const Banner = () => {
    return (
        <div className="grid lg:grid-cols-[1fr,max-content] xl:grid-cols-[42%,1fr] gap-x-10">
        <div className="pt-[6%] grid grid-rows-[max-content,1fr,max-content] items-center">
          <div className="lg:ml-[5vw] max-lg:p-[7%] pt-[12.4%] max-lg:text-center max-w-[800px] max-lg:mx-auto">
            <h1 className="text-5xl md:text-6xl xl:text-7xl leading-[1.1] font-extrabold text-black">
                SpaceX Launches
            </h1>
            <p className="text-base font-normal max-sm:my-12 my-8 lg:max-w-[500px]">
                SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.
            </p>
          </div>
        </div>
        <div className="self-center justify-self-center w-3/4 xl:w-4/5 max-lg:my-[calc(64px+10vw)] max-lg:max-w-[500px] lg:flex lg:justify-center">
            <img
                src={SpaceX}
                alt="spacex"
                className="object-cover w-full h-full mt-7"
            />
        </div>
      </div>
    );
    }
export default Banner;
