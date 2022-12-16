import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartOutlineIcon, ChecklistIcon, ChevronRightIcon, HomeIcon } from "../../assets/icons/icon-svg/iconSvg";
import CartProduct from "../../components/user/cart/CartProduct";
import CartProductTable from "../../components/user/cart/CartProductTable";
// import RemoveItemModal from "../components/modal/RemoveItemModal";
import { checkoutItem } from "../../features/product/productSlice";

const Carts = () => {
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutSuccessModal, setCheckoutSuccessModal] = useState(false);
  let { carts, amount, login } = useSelector((store) => store.product);
  const cartLogin = carts.filter((cart) => cart.idUser === login.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amountLogin = amount.find((item) => item.idUser === login.id);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("login"))) {
      navigate("/login");
    }
  });

  const handleCheckoutModal = () => {
    setCheckoutModal((prevCheckoutModal) => !prevCheckoutModal);
  };

  const handleCheckout = () => {
    dispatch(checkoutItem(cartLogin));
    setCheckoutModal((prevCheckoutModal) => !prevCheckoutModal);
    setCheckoutSuccessModal((prevCheckoutSuccessModal) => !prevCheckoutSuccessModal);
  };

  return (
    <section id="cart" className="pt-12 pb-10 lg:pt-16 font-quicksand bg-white relative">
      {checkoutModal && (
        <div className="absolute z-50">
          <div className="w-full h-full bg-black/30 fixed">
            <div className="w-full h-screen flex justify-center items-center px-4">
              <div className="w-[32rem] min-h-[12rem] p-6 bg-white rounded-md relative">
                <button type="button" onClick={() => setCheckoutModal((prevCheckOutModal) => !prevCheckOutModal)} className="absolute top-4 right-4 font-bold text-xl transition ease-in text-primary hover:text-secondary hover:scale-110">
                  X
                </button>
                <h1 className="w-full font-bold text-lg text-center py-2 border-b-2 border-primary capitalize">Checkout</h1>
                <h1 className="text-primary text-lg font-medium py-8 ">Buy this product? ?</h1>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setCheckoutModal((prevCheckoutModal) => !prevCheckoutModal)} className="text-base px-6 py-1 rounded-lg hover:bg-secondary hover:text-white">
                    Cancel
                  </button>
                  <button type="button" onClick={handleCheckout} className="text-base px-8 py-1 rounded-lg brightness-125 bg-blueButton hover:brightness-100 hover:text-white">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {checkoutSuccessModal && (
        <div className="absolute z-50">
          <div className="w-full h-full bg-black/30 fixed">
            <div className="w-full h-screen flex justify-center items-center px-4">
              <div className="w-[32rem] min-h-[12rem] px-6 py-14 bg-white rounded-md relative flex flex-col justify-between">
                <button
                  type="button"
                  onClick={() => setCheckoutSuccessModal((prevCheckOutSuccessModal) => !prevCheckOutSuccessModal)}
                  className="absolute top-4 right-4 font-bold text-xl transition ease-in text-primary hover:text-secondary hover:scale-110"
                >
                  X
                </button>
                <div className="flex flex-col justify-center items-center w-full">
                  <h1 className="text-primary font-medium py-4 animate-bounce">
                    <ChecklistIcon w="w-16" h="h-16" />
                  </h1>
                  <h1 className="font-medium text-primary text-lg">Checkout Success</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="w-full h-96 bg-fixed bg-center bg-cover overflow-hidden flex justify-center items-center text-center relative"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1586979816990-1819efcad0de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)` }}
      >
        <div className="w-full h-full bg-slate-400 mix-blend-multiply"></div>
        <div className="absolute flex flex-col justify-center items-center text-white">
          <h1 className="text-white text-4xl font-semibold">Cart</h1>
          <div className="py-2 flex flex-wrap justify-evenly items-center capitalize">
            <HomeIcon />
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-medium text-lg text-white transition ease-in-out duration-200 hover:text-secondary">
              Home
            </Link>
            <ChevronRightIcon />
            <h3 className="font-medium text-lg text-white">Cart</h3>
          </div>
        </div>
      </div>
      <div className="container px-8 lg:px-20 pt-14 pb-10">
        {cartLogin.length !== 0 ? (
          <div className="flex flex-col lg:flex-row justify-center">
            <div className="hidden w-full pb-10 lg:w-2/3 md:flex">
              <div className="w-full">
                <table>
                  <thead>
                    <tr className="[&>th]:text-start [&>th]:text-primary [&>th]:py-3 border-b-2 ">
                      <th>Product</th>
                      <th className="xl:min-w-[27.5rem]"></th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartLogin.map((item, index) => {
                      return <CartProductTable product={item} key={index} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex md:hidden justify-start items-start pb-10">
              <div className="w-full">
                <h1 className="font-bold text-primary py-1 border-b-2">Product</h1>
                <div className="grid justify-center gap-7 md:grid-cols-2 xl:grid-cols-4 pt-6">
                  {cartLogin.map((item, index) => (
                    <CartProduct product={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-fit lg:ml-10 lg:w-1/3 bg-slate-100 shadow-sm rounded-xl">
              <div className="w-full px-8 py-10">
                <div className="w-full border-b-2">
                  <h1 className="font-bold text-xl text-primary py-5 capitalize">Order Summary</h1>
                </div>
                <div className="w-full border-b-2 py-5">
                  <div className="flex items-center font-semibold text-lg">
                    <h2 className="w-1/2 tracking-wide text-slate-500">Total</h2>
                    <h2 className="w-1/2 font-garamond text-lg text-end">${amountLogin ? amountLogin.total.toFixed(1) : 0}</h2>
                  </div>
                </div>
                <div className="w-full py-5">
                  <button className="w-full px-5 py-1 bg-blueButton rounded-xl text-white brightness-110 transition ease-in-out duration-200 hover:brightness-100" onClick={handleCheckoutModal}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full min-h-[65vh] flex flex-col justify-center items-center">
            <CartOutlineIcon />
            <h1 className="pt-5 font-bold text-xl tracking-widest">No Cart</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Carts;
