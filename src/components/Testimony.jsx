import React from "react";

const Testimony = () => {
  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <h1 className="text-3xl font-bold">Testimonial</h1>
      <div className="mt-5">
        <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <li>
            <div className="p-10 rounded-lg shadow-lg">
              <div className="flex items-center mb-5 text-base">
                <img
                  className="w-16 h-16 mr-2 border-4 border-orange-400 rounded-full"
                  src="/testi1.jpg"
                  alt="testi1"
                  loading="lazy"
                />
                <div>
                  <h1 className="text-lg font-bold">Zacky R</h1>
                  <span className="font-light">Jakarta, INA</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus id rem accusamus impedit quae mollitia adipisci
                exercitationem aliquid nam alias, quasi ullam animi. Nam, eius.
              </p>
            </div>
          </li>
          <li className="hidden md:block">
            <div className="p-10 rounded-lg shadow-lg">
              <div className="flex items-center mb-5 text-base">
                <img
                  className="w-16 h-16 mr-2 border-4 border-orange-400 rounded-full"
                  src="/testi2.jpg"
                  alt="testi2"
                  loading="lazy"
                />
                <div>
                  <h1 className="text-lg font-bold">Anggie N</h1>
                  <span className="font-light">Surabaya, INA</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus id rem accusamus impedit quae mollitia adipisci
                exercitationem aliquid nam alias, quasi ullam animi. Nam, eius.
              </p>
            </div>
          </li>
          <li className="hidden lg:block">
            <div className="p-10 rounded-lg shadow-lg">
              <div className="flex items-center mb-5 text-base">
                <img
                  className="w-16 h-16 mr-2 border-4 border-orange-400 rounded-full"
                  src="/testi3.jpg"
                  alt="testi3"
                  loading="lazy"
                />
                <div>
                  <h1 className="text-lg font-bold">Komang J</h1>
                  <span className="font-light">Bali, INA</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus id rem accusamus impedit quae mollitia adipisci
                exercitationem aliquid nam alias, quasi ullam animi. Nam, eius.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testimony;
