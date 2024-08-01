import React from "react";

const Experience = () => {
  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="grid w-full grid-cols-2 gap-2 mx-auto mt-3">
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="optimized-images/story1.jpg"
            alt="story1"
            loading="lazy"
          />
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="optimized-images/story3.jpg"
            alt="story3"
            loading="lazy"
          />
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="optimized-images/story4.jpg"
            alt="story4"
            loading="lazy"
          />
          <img
            className="rounded-md h-[200px] md:h-[250px] lg:h-[270px] w-full object-cover"
            src="optimized-images/story2.jpg"
            alt="story2"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center md:ml-20">
          <h1 className="text-lg font-medium text-orange-600 md:mb-2">
            Our Experience
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 md:mb-3 ">
            Our Stories Have Adventures
          </h2>
          <p className="text-gray-700 md:mb-3">
            We are experienced in bringing adventures to stay their journey,
            with all outdoor destinations in the world as our specialties. Start
            your adventure now! Nature has already called you!
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <div className="flex flex-col items-center justify-center gap-1 p-3 bg-orange-100 rounded-md">
              <h1 className="text-3xl font-semibold text-orange-600">10K+</h1>
              <p className="text-slate-700">Success Journeys</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 p-3 bg-orange-100 rounded-md">
              <h1 className="text-3xl font-semibold text-orange-600">5+</h1>
              <p className="text-slate-700">Award Winning</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 p-3 bg-orange-100 rounded-md">
              <h1 className="text-3xl font-semibold text-orange-600">15+</h1>
              <p className="text-slate-700">Year of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
