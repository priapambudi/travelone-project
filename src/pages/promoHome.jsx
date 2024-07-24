import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getPromo } from "../redux/features/promoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
};

const PromoHome = () => {
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { promo } = useSelector((state) => state?.promoReducer);

  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedPromo(null);
  };

  const getPromoDetail = async (id) => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      setSelectedPromo(res.data.data);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getPromo());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="w-[90%] mx-auto p-6">
        <h1 className="text-2xl font-bold text-center">Today's Top Deals</h1>
        <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-3">
          {promo.map((promo) => (
            <div
              onClick={() => getPromoDetail(promo.id)}
              key={promo.id}
              className="w-full mt-3 rounded-lg shadow cursor-pointer hover:shadow-xl"
            >
              <img className="h-[250px] w-full" src={promo.imageUrl} alt="" />
              <div className="p-3">
                <h1 className="text-xl font-bold">{promo.title}</h1>
                <p className="text-sm">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <HighlightOffOutlinedIcon
            className="absolute cursor-pointer top-1 right-1"
            onClick={handleClose}
          />
          {selectedPromo && (
            <div className="flex flex-col h-full bg-transparent">
              <div className="p-6 bg-white rounded-t-md rounded-b-2xl ">
                <img
                  className="object-cover rounded-lg w-full h-[75px] md:h-[200px]"
                  src={selectedPromo.imageUrl}
                  alt={selectedPromo.title}
                />
              </div>

              {/* Dotted Line */}
              <div className="mx-5 bg-white border-dotted border-b-[3px] border-slate-500"></div>

              <div className="flex flex-col h-full p-5 bg-white rounded-b-md rounded-t-2xl">
                <div className="mb-1 text-xl font-bold text-center">
                  {selectedPromo.title}
                </div>

                <div className="text-lg font-medium">
                  Discount{" "}
                  <span className="text-orange-500">
                    {formatToRupiah(selectedPromo.promo_discount_price)}
                  </span>{" "}
                  <br />
                  <span>
                    For Orders Over{" "}
                    {formatToRupiah(selectedPromo.minimum_claim_price)}!
                  </span>
                </div>

                <div className="my-2">
                  <span className="font-medium">CODE: </span>
                  <span className="px-2 py-1 font-bold bg-orange-100 rounded-full">
                    {selectedPromo.promo_code}
                  </span>
                </div>

                <div sx={{ fontSize: "12px", mt: 1 }}>
                  <span className="font-medium">T&C:</span>{" "}
                  {selectedPromo.terms_condition}
                </div>
                <div className="flex justify-center">
                  <button className="px-2 py-1 mt-4 font-semibold border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PromoHome;
