import React, { useEffect, useState } from "react";
import axios from "axios";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Link } from "react-router-dom";

const Activity = () => {
  const [activity, setActivity] = useState([]);
  const getActivity = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      const selectedActivity = res.data.data.slice(0, 3);
      setActivity(selectedActivity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

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
          {activity.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-orange-100 border border-orange-200 rounded-lg "
              >
                <img className="p-3 rounded-3xl" src={item.imageUrls} alt="" />
                <div className="p-3">
                  <p className="mb-1 text-xl font-bold">{item.title}</p>
                  <p className="mb-1 text-sm font-extralight">
                    {item.city}, {item.province}
                  </p>
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
