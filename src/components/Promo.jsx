import React, { useEffect } from "react";

// my swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import "../styles/promo.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPromo } from "../redux/features/promoSlice";

const Promo = () => {
  const dispatch = useDispatch();

  const { promo, loading, error } = useSelector((state) => state.promoReducer);
  const selectedPromo = promo?.slice(0, 6);

  useEffect(() => {
    dispatch(getPromo());
  }, [dispatch]);

  return (
    <div className="w-[90%] mx-auto pb-8 p-6">
      <div className="flex justify-between">
        <h1 className="mb-2 text-3xl font-bold">Coupon Promo</h1>
        <div className="button-attr">
          <div className="w-[200px] flex items-center justify-between p-5 bg-white button-swiper">
            <div className="relative w-auto text-orange-500 swiper-button-prev"></div>
            <div className="relative w-auto swiper-pagination"></div>
            <div className="relative w-auto text-orange-500 swiper-button-next"></div>
          </div>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="">
          {selectedPromo.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="flex h-[100px] w-full gap-2 border border-slate-300 rounded-xl">
                  <div className="w-[200px] h-[100px]">
                    <img
                      className="object-cover w-full h-full rounded-r-xl"
                      src={item.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between w-1/2">
                    <div className="mt-2">
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs">{item.description}</p>
                    </div>
                    <div className="flex justify-end mb-2 mr-2">
                      <Link to={"/promo-home"}>
                        <p className="px-2 py-1 text-xs font-medium text-orange-700 hover:text-orange-900 w-fit">
                          Detail
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default Promo;
