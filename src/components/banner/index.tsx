import React, { useEffect } from 'react';
import Astronaut from '../../assets/images/astronaut.jpg';
import { split } from '../../animation/text';

const Banner = () => {

  useEffect(() => {
    split();
  });
    return (
        <div className="grid lg:grid-cols-[1fr,max-content] xl:grid-cols-[42%,1fr] gap-x-10">
        <div className="pt-[6%] grid grid-rows-[max-content,1fr,max-content] items-center">
          <div className="lg:ml-[5vw] max-lg:p-[7%] pt-[12.4%] max-lg:text-center max-w-[800px] max-lg:mx-auto">
            <h1 className="text-4xl md:text-5xl xl:text-6xl leading-[1.1] font-extrabold font-CustomFont sans-serif">
            SpaceX: Elevating Humanity Beyond Earth's Limits
            </h1>
            <p className="text-base font-normal max-sm:my-12 my-8 lg:max-w-[500px] font-CustomFont sans-serif leading-8" data-animation='paragraph'>
            At SpaceX, we pioneer cutting-edge space technology since 2002, aiming to redefine the possibilities of interplanetary life. Join us in the quest to make living on other planets a reality.
            </p>
          </div>
        </div>
        <div className="self-center justify-self-center w-3/4 xl:w-4/5 max-lg:my-[calc(64px+10vw)] max-lg:max-w-[500px] lg:flex lg:justify-center rounded-md">
            <img
                src={Astronaut}
                alt="spacex"
                className="object-cover w-full h-full mt-7 rounded-t-3xl"
            />
        </div>
      </div>
    );
    }
export default Banner;
