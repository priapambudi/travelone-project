import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import formatToRupiah from "../../format_rupiah/rupiah";

const PromoDetailDash = () => {
  const params = useParams();
  const [promo, setPromo] = useState({});

  const getPromoById = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${params.id}`,
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
    getPromoById();
  }, []);

  return (
    <div className="w-[90%] my-5 mx-auto rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center text-orange-500 ">
        Detail Promo
      </h1>
      <div className="flex flex-col gap-6 p-6">
        <div className="overflow-hidden rounded-lg">
          <img
            className="w-full h-[300px] object-cover object-center"
            src={promo.imageUrl}
            alt={promo.title}
          />
        </div>
        <div className="flex justify-center gap-8 text-gray-700">
          <div className="space-y-1">
            <h2 className="font-semibold ">
              Promo Name: <span className="font-normal">{promo.title}</span>
            </h2>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {promo.description}
            </p>
            <p>
              <span className="font-semibold">Code:</span> {promo.promo_code}
            </p>
            <p>
              <span className="font-semibold">Min. Discount Price:</span>{" "}
              {formatToRupiah(promo.minimum_claim_price)}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Discount:</span>{" "}
              {formatToRupiah(promo.promo_discount_price)}
            </p>
            <p>
              <span className="font-semibold">Terms & Conditions:</span>{" "}
              {promo.terms_condition}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(promo.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(promo.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Link to="/dashboard/promo" className="self-center">
          <button className="px-6 py-2 text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PromoDetailDash;
