import React, { useEffect, useState } from "react";
import axios from "axios";

const Promo = () => {
  const [promo, setPromo] = useState([]);
  const getPromo = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      //   console.log(res);
      setPromo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPromo();
  }, []);

  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <h1 className="mb-2 text-3xl font-bold">Coupon Promo</h1>

      <div className="grid grid-cols-1 gap-5 md:grid md:grid-cols-3">
        {promo.map((item) => {
          return (
            <div key={item.id} className="flex gap-2 border rounded-xl">
              <div>
                <img
                  className="w-[200px] rounded-l-xl"
                  src={item.imageUrl}
                  alt=""
                />
              </div>
              <div>
                <p>{item.title}</p>
                <p className="px-2 py-1 bg-orange-100 rounded-full w-fit">
                  {item.promo_code}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promo;
