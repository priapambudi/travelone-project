import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   bgcolor: "background.paper",
//   boxShadow: 24,
// };

const PromoHome = () => {
  const [promo, setPromo] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedPromo(null);
  };

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
    getPromo();
  }, []);

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

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box className="w-[300px] h-fit md:w-[500px] rounded-lg overflow-hidden shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
          <HighlightOffOutlinedIcon
            className="absolute cursor-pointer top-2 right-2"
            onClick={handleClose}
          />
          {selectedPromo && (
            <div className="h-full ">
              <div className="">
                <img
                  className="object-cover w-full h-[120px] md:h-[200px]"
                  src={selectedPromo.imageUrl}
                  alt={selectedPromo.title}
                />
              </div>
              <div className="flex flex-col h-full p-2 ">
                <Typography
                  id="modal-modal-title"
                  sx={{ mb: 1, fontWeight: "bold", fontSize: "24px" }}
                >
                  {selectedPromo.title}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mb: 1, fontSize: "12px" }}
                >
                  {selectedPromo.description}
                </Typography>
                <Typography sx={{ mb: 1, fontSize: "14px" }}>
                  Discount {selectedPromo.promo_discount_price} <br />
                  <span>
                    For Orders Over {selectedPromo.minimum_claim_price}
                  </span>
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                  CODE: {selectedPromo.promo_code}
                </Typography>

                <Typography sx={{ fontSize: "12px", mt: 1 }}>
                  T&C: {selectedPromo.terms_condition}
                </Typography>

                <div className="flex justify-center">
                  <button className="px-2 py-1 mt-4 font-semibold border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white ">
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
