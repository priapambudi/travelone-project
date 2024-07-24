import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import formatToRupiah from "../../format_rupiah/rupiah";

const ActivityDetailDash = () => {
  const params = useParams();
  const [activity, setActivity] = useState({});

  const getActivityById = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${params.id}`,
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
    getActivityById();
  }, []);

  //   if (!activity) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <div className="w-[90%] mt-5 mx-auto rounded-lg shadow-lg bg-white">
      <h1 className="mb-4 text-2xl font-bold text-center text-orange-500">
        Detail Activity
      </h1>
      <div className="flex flex-col">
        <div className="overflow-hidden rounded-lg">
          <img
            className="w-full h-[300px] object-cover object-center"
            src={activity.imageUrls}
            alt={activity.title}
          />
        </div>
        <div className="flex justify-center gap-8 p-4 text-gray-700">
          <div>
            <p className="font-semibold ">
              Category:{" "}
              <span className="font-normal">{activity?.category?.name}</span>
            </p>
            <p className="font-semibold ">
              Title: <span className="font-normal">{activity.title}</span>
            </p>
            <p className="font-semibold ">
              Description:{" "}
              <span className="font-normal">{activity.description}</span>
            </p>
            <p className="font-semibold ">
              Facilities:{" "}
              <span className="font-normal">{activity.facilities}</span>
            </p>
            <p className="font-semibold ">
              Price:{" "}
              <span className="font-normal">
                {formatToRupiah(activity.price)}
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold ">
              Price Discount:{" "}
              <span className="font-normal">
                {formatToRupiah(activity.price_discount)}
              </span>
            </p>
            <p className="font-semibold ">
              Rating: <span className="font-normal">{activity.rating}</span>
            </p>
            <p className="font-semibold ">
              Total Reviews:{" "}
              <span className="font-normal">{activity.total_reviews}</span>
            </p>
            <p className="font-semibold ">
              Location:{" "}
              <span className="font-normal">
                {activity.address}, {activity.city}, {activity.province}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-3 mb-3">
        <Link to="/dashboard/activity">
          <button className="px-6 py-2 text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ActivityDetailDash;
