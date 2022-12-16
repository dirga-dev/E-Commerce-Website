import React from "react";

const CartRekap = ({ item, index }) => {
  return (
    <div className="w-full flex text-primary border-b-2 py-2 container">
      <div className="text-center text-xs w-[2rem]">{index + 1}</div>
      <div className="container font-medium text-xs w-[12rem]">{item.title}</div>
      <div className="text-center w-[3rem] text-xs">{item.quantity}</div>
      <div className="pl-4 text-right w-[4rem] text-xs">$ {(item.price * item.quantity).toFixed(1)}</div>
    </div>
  );
};

export default CartRekap;
