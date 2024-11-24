import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    Name: "Sofia Ramirez",
    opinion:
      "The site exceeded my expectations. Everything is intuitive, and I found what I needed in no time. Highly recommended!",
  },
  {
    Name: "Luis Martinez",
    opinion:
      "I appreciate how efficient the platform is. My experience has been smooth, and I've already shared it with my colleagues. Great job!",
  },
  {
    Name: "Laura Gomez",
    opinion:
      "The site is amazing and very easy to use. I loved how I can manage my data quickly and efficiently. I will definitely recommend it to my friends!",
  },
  {
    Name: "Carlos Perez",
    opinion:
      "I had my doubts at first, but the registration process was very straightforward. Now I can access all the information I need in one place. Excellent experience!",
  },
  {
    Name: "Ana Torres",
    opinion:
      "I was surprised at how quickly I could create my profile. The interface is user-friendly and everything works perfectly. I'm very satisfied with the service!",
  },
  {
    Name: "Javier Martinez",
    opinion:
      "Very well-designed site. I love the functionality, and customer support was exceptional. I will definitely use it again. Thank you for the great experience!",
  },
];

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-2/5 py-10 px-5">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="px-5 py-2 h-36 bg-black/70 text-justify justify-between border rounded-lg shadow-lg transition-transform duration-500 transform "
          >
            <h3 className="text-sm md:text-base lg:text-lg font-bold text-peach-600 ">
              {testimonial.Name}
            </h3>
            <p className="text-xs md:text-sm text-pretty mt-2 text-white">
              {testimonial.opinion}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
