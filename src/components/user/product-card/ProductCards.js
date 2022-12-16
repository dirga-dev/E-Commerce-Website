import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartIcon, HeartFillIcon, HeartIcon } from "../../../assets/icons/icon-svg/iconSvg";
import { addCart, saveItem, unSaveItem } from "../../../features/product/productSlice";

const ProductCards = ({ item }) => {
  let { id, title, price, category, image, stock } = item;
  const { saved, login } = useSelector((store) => store.product);
  const isSaved = saved.some((save) => save.userId === login.id && save.productId === id);
  const slug = category.replace(" ", "-");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCart = () => {
    if (stock !== 0) {
      dispatch(addCart({ id: id, quantity: 1 }));
      navigate("/cart");
    }
  };

  const handleSave = () => {
    if (JSON.parse(!localStorage.getItem("login"))) {
      navigate("/login");
    } else {
      dispatch(saveItem({ id }));
    }
  };
  const handleUnSave = () => {
    dispatch(unSaveItem({ id }));
  };
  return (
    <div className="group flex">
      <div className="w-full px-6 py-7 mb-10 bg-white rounded-none shadow-md overflow-hidden relative flex flex-col transition ease-in-out duration-500 group-hover:scale-105 group-hover:shadow-xl ">
        <div className="p-2 border z-10 flex justify-end absolute h-28 w-28 -top-20 -left-[10rem] bg-secondary transition ease-in-out duration-700 origin-bottom-right rotate-45 group-hover:translate-x-10 group-hover:translate-y-10 ">
          <button onClick={handleCart} className="text-white -rotate-45 self-center">
            <CartIcon />
          </button>
        </div>
        <div className="absolute h-full z-10 flex flex-col justify-center -right-10">
          <div className="flex flex-col h-1/4 justify-evenly">
            {isSaved ? (
              <button
                onClick={handleUnSave}
                className="w-10 h-10 bg-slate-200 text-red-500 shadow-md rounded-full flex justify-center items-center transition delay-100 duration-200 ease-in-out hover:bg-blueButton hover:opacity-100 group-hover:-translate-x-12"
              >
                <HeartFillIcon />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="w-10 h-10 bg-slate-200 opacity-50 shadow-md rounded-full flex justify-center items-center transition delay-100 duration-200 ease-in-out hover:bg-blueButton hover:text-white hover:opacity-100 group-hover:-translate-x-12 active:text-red-500"
              >
                <HeartIcon />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-1 justify-center text-center">
          <Link to={`/products/${id}`} onClick={() => window.scrollTo(0, 0)} className="w-full lg:w-2/3 font-bold text-primary text-2xl mb-3 transition duration-200 hover:text-secondary">
            {title}
          </Link>
        </div>
        <div className="flex-1">
          <div className=" flex flex-wrap justify-center items-center text-center">
            <Link to={`/products/${id}`} onClick={() => window.scrollTo(0, 0)}>
              <img src={image} alt="" className="object-scale-down my-4 w-full h-44 md:h-[12rem]" />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center text-center">
          <Link to={`/${slug}`} onClick={() => window.scrollTo(0, 792)} className="w-full font-medium text-primary text-lg my-2 transition duration-300 hover:text-secondary">
            {category}
          </Link>
          <h2 className="font-semibold text-secondary text-xl mb-4">${price}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
