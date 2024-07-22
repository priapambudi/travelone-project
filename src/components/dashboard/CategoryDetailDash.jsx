import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryDetailDash = () => {
  const params = useParams();
  const [category, setCategory] = useState({});

  const getCategoryById = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${params.id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryById();
  }, []);

  return (
    <div className="w-[90%] my-5 mx-auto rounded-lg shadow-lg bg-white">
      <h1 className="text-xl font-bold text-center text-orange-500 ">
        Detail Category
      </h1>
      <div className="flex flex-col gap-5 p-6">
        <div className="overflow-hidden rounded-lg">
          <img
            className="w-full h-[300px] object-cover object-center"
            src={category.imageUrl}
            alt={category.name}
          />
        </div>
        <div className="space-y-1 text-gray-700">
          <h2 className="font-semibold ">
            Category Name: <span className="font-normal">{category.name}</span>
          </h2>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(category.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(category.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <Link to="/dashboard/category" className="self-center">
          <button className="px-6 py-2 text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryDetailDash;
