import React, { useEffect, useState } from "react";
import axios from "axios";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      const selectedCategories = res.data.data.slice(0, 3);
      setCategories(selectedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <div className="flex items-center justify-between md:mr-20 md:flex-row">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-left">Category</h1>
          <p className="mb-5 text-left text-gray-500">
            Here are lots of interesting destinations to visit, <br /> but don’t
            be confused—they’re already grouped <br /> by category.
          </p>
        </div>
        <Link className="hidden md:block" to="">
          <KeyboardDoubleArrowRightOutlinedIcon
            sx={{ fontSize: 60 }}
            className="mx-auto text-orange-400 border border-orange-300 rounded-full "
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid md:grid-cols-3">
        {categories.map((category) => (
          <div
            className="relative flex flex-col items-center hover:opacity-60"
            key={category.id}
          >
            <img
              className="w-[200px] h-[150px] md:w-full md:h-full object-cover rounded-t-full "
              src={category.imageUrl}
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white opacity-0 hover:opacity-100">
              <p>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Link className="flex mt-4 md:hidden" to="">
        <KeyboardDoubleArrowRightOutlinedIcon
          sx={{ fontSize: 60 }}
          className="mx-auto text-orange-400 border border-orange-300 rounded-full "
        />
      </Link>
    </div>
  );
};

export default Category;
