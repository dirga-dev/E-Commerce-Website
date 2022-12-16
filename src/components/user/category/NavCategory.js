import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavCategory = () => {
  const [active, setActive] = useState();
  const location = useLocation().pathname;

  useEffect(() => {
    setActive(location);
  }, [location]);
  return (
    <section id="category">
      <div className="container pt-28">
        <div className="flex flex-col justify-center items-center">
          <div className=" text-center">
            <h1 className=" font-quicksand font-bold text-4xl text-primary border-x-[3px] border-secondary px-10 uppercase">New Product</h1>
          </div>
          <div className="w-full md:w-1/2 mt-4 flex flex-wrap justify-evenly items-center font-quicksand ">
            <div className="px-3 py-1 flex flex-col justify-center items-center group ">
              <Link
                to="/products"
                className={active === "/" || active === "/products" ? "font-semibold text-lg text-secondary capitalize" : "font-semibold text-lg text-primary capitalize transition ease-in-out duration-300 hover:text-secondary"}
              >
                all
                <span className={active === "/" || active === "/products" ? "block h-0.5 w-full bg-secondary" : "block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"}></span>
              </Link>
            </div>
            <div className="px-3 py-1 flex flex-col justify-center items-center group ">
              <Link
                to="/men's-clothing"
                className={active === "/men's-clothing" ? "font-semibold text-lg text-secondary capitalize" : "font-semibold text-lg text-primary capitalize transition ease-in-out duration-300 hover:text-secondary"}
              >
                Men's
                <span className={active === "/men's-clothing" ? "block h-0.5 w-full bg-secondary" : "block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"}></span>
              </Link>
            </div>
            <div className="px-3 py-1 flex flex-col justify-center items-center group">
              <Link
                to="/women's-clothing"
                className={active === "/women's-clothing" ? "font-semibold text-lg text-secondary capitalize" : "font-semibold text-lg text-primary capitalize transition ease-in-out duration-300 hover:text-secondary"}
              >
                Women's
                <span className={active === "/women's-clothing" ? "block h-0.5 w-full bg-secondary" : "block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"}></span>
              </Link>
            </div>
            <div className="px-3 py-1 flex flex-col justify-center items-center group">
              <Link to="/electronics" className={active === "/electronics" ? "font-semibold text-lg text-secondary capitalize" : "font-semibold text-lg text-primary capitalize transition ease-in-out duration-300 hover:text-secondary"}>
                Electronics
                <span className={active === "/electronics" ? "block h-0.5 w-full bg-secondary" : "block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"}></span>
              </Link>
            </div>
            <div className="px-3 py-1 flex flex-col justify-center items-center group">
              <Link to="/jewelery" className={active === "/jewelery" ? "font-semibold text-lg text-secondary capitalize" : "font-semibold text-lg text-primary capitalize transition ease-in-out duration-300 hover:text-secondary"}>
                Jewelery
                <span className={active === "/jewelery" ? "block h-0.5 w-full bg-secondary" : "block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"}></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavCategory;
