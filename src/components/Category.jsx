import React, { useEffect } from "react";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/features/categorySlice";

const Category = () => {
  const dispatch = useDispatch();

  const { loading, error, category } = useSelector(
    (state) => state?.categoryReducer
  );

  const selectedCategories = category?.slice(0, 3);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid md:grid-cols-3">
        {selectedCategories.map((category) => (
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
    </div>
  );
};

export default Category;
