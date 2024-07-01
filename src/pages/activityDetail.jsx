import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ActivityDetail = () => {
  const param = useParams();
  const [categories, setCategories] = useState({});
  const getCategory = async () => {
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
      console.log(res.data.data);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-[90%] mx-auto p-6 ">
        <h1>Activity Detail</h1>
        <p>{categories.title}</p>
        {/* <p>
          Here are lots of interesting destinations to visit, but don’t be
          confused they’re already grouped by category.
        </p> */}
        {/* <div className="grid grid-cols-1 gap-5 md:grid md:grid-cols-3">
          {categories.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center w-full h-full gap-12 mx-auto md:items-start md:w-1/2 md:mx-0 left"
              >
                <img src={item.imageUrl} alt="" />
                <h1>{item.name}</h1>
              </div>
            );
          })}
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetail;
