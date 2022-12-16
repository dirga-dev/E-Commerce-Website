import React from "react";
import homepage from "../../assets/images/homepage1.jpeg";
import NavCategory from "../../components/user/category/NavCategory";
import ProductCategory from "../../components/user/category/ProductCategory";
import image from "../../assets/images/homepage.jpg";

const Homepage = () => {
  return (
    <section id="home">
      <div className="w-full h-screen flex items-center bg-cover px-8 md:px-20" style={{ backgroundImage: `url(${homepage})` }}>
        <div className="container">
          <div className="flex justify-between items-end">
            <div className="w-full lg:w-1/2 flex-col items-center">
              <h1 className="w-full mb-14 font-bold font-garamond text-primaryLight text-7xl drop-shadow-lg capitalize">One Stop Shop For All Your Needs</h1>
              <a href="#category" className="px-7 py-2 mt-10 font-inter text-base text-white bg-blueButton rounded-full transition duration-300 hover:brightness-110">
                Explore Products
              </a>
            </div>
          </div>
        </div>
      </div>
      <NavCategory />
      <ProductCategory />
      <div className="w-full h-96 bg-cover overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
        <div className="w-full h-full bg-slate-300 mix-blend-multiply"></div>
      </div>
    </section>
  );
};

export default Homepage;
