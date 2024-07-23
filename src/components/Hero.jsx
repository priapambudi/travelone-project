import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../redux/features/bannerSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const { banner, loading, error } = useSelector(
    (state) => state?.bannerReducer
  );
  const selectedBanner = banner?.[0];

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <Link to="/act-home">
              <button className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-8 mx-auto md:w-1/2 md:items-start right">
          {selectedBanner ? (
            <div className="w-[20rem] h-[25rem] md:w-[30rem] md:h-[30rem] overflow-hidden rounded-3xl border-solid border-8 border-orange-500">
              <img
                className="w-full h-full"
                src={selectedBanner.imageUrl}
                alt=""
              />
            </div>
          ) : (
            <div>No banner available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
