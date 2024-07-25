import React, { useEffect } from "react";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { getActivity } from "../redux/features/activitySlice";

const Activity = () => {
  const dispatch = useDispatch();

  const { activity, loading, error } = useSelector(
    (state) => state.activityReducer
  );
  const selectedActivity = activity?.slice(0, 3);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <div>
        <div className="flex items-center justify-between md:mr-20 md:flex-row">
          <div>
            <h1 className="mb-3 text-3xl font-bold">
              Find The Best Activities
            </h1>
            <p className="mb-5 text-left text-gray-500">
              Explore hidden gems, conquer new challenges <br /> and create an
              authentic travel experience.
            </p>
          </div>
          <Link className="hidden md:block" to="/act-home">
            <KeyboardDoubleArrowRightOutlinedIcon
              sx={{ fontSize: 60 }}
              className="mx-auto text-orange-400 border border-orange-300 rounded-full "
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid md:grid-cols-3">
          {selectedActivity.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-orange-100 border border-orange-200 rounded-lg "
              >
                <img
                  className="w-full h-[250px] p-3 rounded-3xl"
                  src={item.imageUrls[0]}
                  alt=""
                />
                <div className="p-3">
                  <p className="mb-1 text-xl font-bold">{item.title}</p>
                  <div className="flex items-center">
                    <LocationOnIcon
                      className="text-slate-400"
                      sx={{ fontSize: 15 }}
                    />
                    <p className="mb-1 text-sm font-extralight">
                      {item.city}, {item.province}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Rp.{item.price}</p>
                    <Link
                      to={`/act-detail/${item.id}`}
                      className="px-3 py-1 text-white bg-orange-500 rounded-full"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link className="flex mt-4 md:hidden" to="/act-home">
        <KeyboardDoubleArrowRightOutlinedIcon
          sx={{ fontSize: 60 }}
          className="mx-auto text-orange-400 border border-orange-300 rounded-full "
        />
      </Link>
    </div>
  );
};

export default Activity;
