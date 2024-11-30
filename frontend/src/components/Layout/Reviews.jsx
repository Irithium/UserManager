import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reviews } from "../../utils/reviews";

const ReviewsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "100px",
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [],
  };

  return (
    <div className=" w-full text-center py-10">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="place-content-between px-6 pr-12 py-4 h-44 max-w-[95%] mx-auto bg-dim_gray-300/50 rounded-md"
          >
            <p className="text-xs md:text-sm xl:text-base text-justify text-white leading-relaxed xl:mb-4">
              {review.opinion}
            </p>
            <h3 className="text-xs text-left lg:text-sm mt-2 font-semibold text-peach-600 ">
              {review.Name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsCarousel;
