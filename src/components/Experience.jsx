import React from "react";

const Experience = () => {
  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="grid w-full grid-cols-2 gap-2 mx-auto mt-3">
          <img
            className="rounded-md h-[200px] md:h-[250px]  lg:h-[270px] w-full object-cover"
            src="/story1.jpg"
            alt=""
          />
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="/story3.jpg"
            alt=""
          />
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="/story4.jpg"
            alt=""
          />
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="/story2.jpg"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center md:ml-20">
          <h3 className="text-lg text-orange-400 md:mb-2">Our Experience</h3>
          <h1 className="text-3xl font-bold md:mb-3 ">
            Our Stories Have Adventures
          </h1>
          <p className="md:mb-3 text-slate-400">
            We are experienced in bringing adventures to stay their journey,
            with all outdoor destinations in the world as our specialties. Start
            your adventure now! Nature has already called you!
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-md bg-orange-50">
              <h1 className="text-3xl font-semibold text-orange-400">10K+</h1>
              <p className="text-slate-400">Success Journeys</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-md bg-orange-50">
              <h1 className="text-3xl font-semibold text-orange-400">5+</h1>
              <p className="text-slate-400">Award Winning</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-md bg-orange-50">
              <h1 className="text-3xl font-semibold text-orange-400">15+</h1>
              <p className="text-slate-400">Year of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
