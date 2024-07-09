import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PromoDetail = () => {
  const param = useParams();
  const [promo, setPromo] = useState({});

  const getPromo = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/" +
          param.id,
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-[90%] mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Promo Detail</h1>
        <div className="flex flex-col mt-4 border border-orange-300 rounded-xl md:w-3/4 md:mx-auto">
          <div>
            <img
              className="rounded-t-xl md:w-full"
              src={promo.imageUrl}
              alt=""
            />
          </div>
          <div className="p-5">
            <h1 className="text-xl font-bold text-center md:text-3xl">
              {promo.title}
            </h1>
            <div className="">
              <div className="mt-2">
                <p className="text-lg font-semibold md:text-2xl">
                  {promo.minimum_claim_price} OFF
                </p>
                <p className="text-base font-medium md:text-lg">
                  FOR ORDERS OVER Rp.{promo.promo_discount_price}
                </p>
              </div>
              <div>
                <div className="flex my-2 text-sm text-orange-400 md:text-lg">
                  <p className="mr-1">Code:</p>
                  <span>{promo.promo_code}</span>
                </div>
                <p className="text-sm md:text-lg">
                  Term & Condition: {promo.terms_condition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  );
};

export default PromoDetail;
