import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ActivityDetail = () => {
  const param = useParams();
  const [activityDetail, setActivityDetail] = useState([]);

  const getActivityDetail = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/" +
          param.id,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      setActivityDetail(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActivityDetail();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-[90%] mx-auto p-6">
        <div className="flex flex-col rounded-lg shadow-lg">
          <img
            className="rounded-t-lg md:h-[400px] md:w-[100%] object-cover"
            src={activityDetail.imageUrls}
            alt=""
          />
          <div className="flex flex-col px-6 pt-2 pb-8 md:flex-row md:gap-3">
            <div className="mb-2">
              <h1 className="text-3xl font-semibold">{activityDetail.title}</h1>
              <div className="flex gap-5">
                <p>
                  <span className="font-bold text-slate-600">
                    {activityDetail.rating}
                  </span>
                  <span className="text-slate-500">/5</span>
                </p>
                <p className="text-slate-500">
                  {activityDetail.total_reviews} Reviews
                </p>
              </div>
              <hr className="mt-2" />
              <p className="mt-1 text-sm">
                <span className="font-bold text-slate-600">Address:</span>{" "}
                {activityDetail.address}, {activityDetail.city},{" "}
                {activityDetail.province}
              </p>
              <p className="text-sm">
                <span className="font-bold text-slate-600">Description:</span>{" "}
                {activityDetail.description}
              </p>
              <p className="text-sm">
                <span className="font-bold text-slate-600">Facility:</span>{" "}
                {activityDetail.facilities}
              </p>
              <hr className="mt-2" />
              <div className="p-3 mt-2 rounded-lg bg-orange-50">
                <p className="text-sm font-bold">What travelers say:</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full"
                      width={25}
                      height={25}
                      src="/testi1.jpg"
                      alt=""
                    />
                    <p className="text-sm font-semibold">Zacky R</p>
                  </div>
                  <div className="">
                    <span className="px-1 text-sm bg-orange-500 rounded text-slate-200">
                      <span className="font-bold text-white">4</span>/5
                    </span>{" "}
                    <span className="text-sm font-medium text-orange-500">
                      Excellent
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  it was a trip to Bali Indonesia with friend and we visited a
                  lot of interesting places. It was very beautiful and we really
                  enjoy it.
                </p>
              </div>
            </div>
            <div className="p-3 border-t-4 border-orange-500 rounded-lg shadow-lg md:h-fit md:w-[450px] mt-2">
              <p>
                From{" "}
                <span className="line-through">{activityDetail.price}</span>{" "}
                {activityDetail.price_discount}
              </p>

              <ul className="flex gap-2 text-xs">
                <li className="flex items-center ">
                  {" "}
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>{" "}
                  Ready to use immediately
                </li>
                <li className="flex items-center">
                  {" "}
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>{" "}
                  Free of charge
                </li>
              </ul>

              <button
                type="button"
                className="w-full p-2 mt-2 font-semibold text-white bg-orange-400 rounded-lg"
              >
                View Tickets
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 mt-3 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold">
            Route to {activityDetail.title}
          </h1>
          <div className="mt-3">
            <div
              className="w-full h-[200px] md:h-[350px]"
              dangerouslySetInnerHTML={{
                __html: activityDetail.location_maps
                  ? activityDetail.location_maps.replace(
                      /<iframe /,
                      '<iframe style="width: 100%; height: 100%;" '
                    )
                  : "",
              }}
            />
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default ActivityDetail;
