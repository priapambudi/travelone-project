import React, { useEffect, useState } from "react";
import axios from "axios";

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
      setActivity(res.data.data);
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
        <div>
          <h1 className="mb-3 text-3xl font-bold">Find The Best Activities</h1>
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
                    <button className="px-3 py-1 text-white bg-orange-500 rounded-full">
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activity;
