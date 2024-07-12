import axios from "axios";
import { useEffect, useState } from "react";

const Hero = () => {
  const [banner, setBanner] = useState([]);

  const getBanner = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(res.data.data);
      setBanner(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div className="relative pb-8 w-[90%] mx-auto text-black hero-wrapper">
      <div className="flex flex-col items-end justify-between w-full gap-8 p-6 md:flex-row hero-contaier">
        <div className="flex flex-col items-center justify-center w-full h-full gap-12 mx-auto my-auto md:items-start md:w-1/2 md:mx-0 left">
          <div className="">
            <h1 className="text-5xl font-bold text-center md:text-left">
              Discover the <br />
              Best Lovely <br /> Place
            </h1>
          </div>

          <div className="text-2xl text-center md:text-left">
            <span>
              Plan and book your perfect trip <br />
              with expert advice, travel tips, destination information <br />
              and inspiration from us.
            </span>
          </div>

          <div>
            <button className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600">
              Get Started
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-8 mx-auto md:w-1/2 md:items-start right">
          {/* {banner.map((item) => (
            <div
              className="w-[30rem] h-[35rem] overflow-hidden rounded-3xl border-solid border-8 border-orange-500"
              key={item.id}
            >
              <img className="w-full h-full" src={item.imageUrl} alt="" />
            </div>
          ))} */}
          <div className="w-[20rem] h-[25rem] md:w-[30rem] md:h-[30rem] overflow-hidden rounded-3xl border-solid border-8 border-orange-500">
            <img className="w-full h-full" src={banner.imageUrl} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
