import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ActivityHome = () => {
  const [categories, setCategories] = useState([]);
  const [activitiesByCategory, setActivitiesByCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleItemClick = (id) => {
    setSelectedCategoryId(id);
    getActivitybyCategory(id);
  };

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
      // console.log(res.data.data);
      setCategories(res.data.data);

      // Find and set default category
      const defaultCategory = res.data.data.find(
        (category) => category.name === "INDONESIA"
      );
      if (defaultCategory) {
        setSelectedCategoryId(defaultCategory.id);
        getActivitybyCategory(defaultCategory.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getActivitybyCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${categoryId}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      // console.log(res);
      setActivitiesByCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-[90%] mx-auto p-6 ">
        <h1 className="mb-2 text-2xl font-bold md:text-center md:text-3xl">
          Popular Activities
        </h1>

        {/* TODO: Implement category selection */}
        <div className="flex flex-wrap gap-3 md:justify-center">
          {categories.map((item) => {
            const isSelected = selectedCategoryId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-md border-slate-600 px-2 py-1 cursor-pointer ${
                  isSelected ? "bg-orange-500 text-white" : "bg-white"
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <li className="text-xs list-none md:text-sm">{item.name}</li>
              </div>
            );
          })}
        </div>

        {/* TODO: Implement activity list */}
        {selectedCategoryId && (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {activitiesByCategory.map((activity) => (
                <Link to={`/act-detail/${activity.id}`} key={activity.id}>
                  <div className="relative p-2">
                    <div className="overflow-hidden rounded-md cursor-pointer">
                      <img
                        src={activity.imageUrls[0]}
                        alt={activity.title}
                        className="w-full h-full transition-transform duration-500 bg-cover hover:scale-110 "
                      />
                    </div>

                    <h3 className="absolute left-0 right-0 flex items-center justify-center font-medium text-white bottom-5">
                      {activity.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            {activitiesByCategory.length === 0 && (
              <p className="text-xl font-medium text-center mb-36">
                No activities found.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer className="flex-shrink-0 mt-auto" />
    </div>
  );
};

export default ActivityHome;
