import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../redux/features/bannerSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const { banner, loading, error } = useSelector(
    (state) => state?.bannerReducer
  );
  const selectedBanner = banner?.[2];

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pb-8 w-[90%] mx-auto text-black">
      <div className="flex flex-col items-end justify-between w-full gap-8 p-6 md:flex-row">
        <div className="flex flex-col items-center justify-center w-full h-full gap-12 mx-auto my-auto md:items-start md:w-1/2 md:mx-0">
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
            <Link to="/act-home">
              <button className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-8 mx-auto md:w-1/2 md:items-start">
          {selectedBanner ? (
            <div className=" w-[20rem] h-[25rem] md:w-[30rem] md:h-[30rem] overflow-hidden rounded-3xl border-solid border-8 border-orange-500">
              <img
                className="object-cover w-full h-full aspect-[4/5]"
                src={selectedBanner.imageUrl}
                alt="hero_banner"
                width="480"
                height="600"
                // style={{ aspectRatio: "4 / 5", objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="w-[20rem] h-[25rem] md:w-[30rem] md:h-[30rem] bg-gray-200 rounded-3xl border-solid border-8 border-orange-500 flex items-center justify-center">
              <span>No banner available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
