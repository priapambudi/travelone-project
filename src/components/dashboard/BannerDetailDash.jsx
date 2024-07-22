import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BannerDetailDash = () => {
  const params = useParams();
  const [banner, setBanner] = useState({});

  const getBannerById = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${params.id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      setBanner(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBannerById();
  }, []);

  return (
    <div className="w-[90%] mt-5 mx-auto rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center text-orange-500 ">
        Detail Banner
      </h1>
      <div className="flex flex-col gap-6 p-6">
        <div className="overflow-hidden rounded-lg">
          <img
            className="w-full h-[300px] object-cover object-center"
            src={banner.imageUrl}
            alt={banner.name}
          />
        </div>
        <div className="text-gray-700 space-y1">
          <p className="font-semibold ">
            Banner Name: <span className="font-normal">{banner.name}</span>
          </p>
          <p className="font-semibold ">
            Created At:{" "}
            <span className="font-normal">
              {new Date(banner.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="font-semibold ">
            Updated At:{" "}
            <span className="font-normal">
              {new Date(banner.updatedAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <Link to="/dashboard/banner" className="self-center">
          <button className="px-6 py-2 text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BannerDetailDash;
