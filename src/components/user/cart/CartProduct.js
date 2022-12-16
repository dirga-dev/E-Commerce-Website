import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon } from "../../../assets/icons/icon-svg/iconSvg";
import { addCart, removeItem } from "../../../features/product/productSlice";

const CartProduct = ({ product }) => {
  const { products } = useSelector((store) => store.product);
  const { idProduct, quantity } = product.product;
  const { image, price, title, stock } = products.find((item) => item.id === idProduct);
  const [qty, setQty] = useState(stock === 0 ? 0 : quantity);
  const dispatch = useDispatch();

  const handleSubtract = () => {
    setQty(qty - 1);

    dispatch(removeItem({ id: idProduct, quantity: qty }));
  };

  const handlePlus = () => {
    setQty(qty + 1);
    dispatch(addCart({ id: idProduct, quantity: qty + 1 }));
  };

  return (
    <div className="w-full flex text-primary border-b-2 py-3">
      <div className="w-full">
        <img src={image} alt={title} className="w-28 h-28 object-scale-down" />
      </div>
      <div className="w-full flex flex-col">
        <h1 className="font-semibold">{title}</h1>
        <h2 className="font-medium pt-1">
          Price : <span className="font-semibold">${price}</span>
        </h2>
        <div className="flex flex-col py-3">
          <div className="w-32 px-5 py-1 mr-5 bg-slate-50 shadow-md rounded-full flex flex-row justify-between">
            {qty <= 0 ? (
              <button className="transition ease-in-out duration-200 hover:text-secondary" disabled>
                <MinusIcon />
              </button>
            ) : (
              <button className="transition ease-in-out duration-200 hover:text-secondary" onClick={handleSubtract}>
                <MinusIcon />
              </button>
            )}
            <input type="number" value={qty} disabled className="min-w-[1rem] rounded-full text-center" />
            {stock - quantity === 0 ? (
              <button className="transition ease-in-out duration-200 hover:text-secondary capitalize" disabled>
                max
              </button>
            ) : (
              <button className="transition ease-in-out duration-200 hover:text-secondary" onClick={handlePlus}>
                <PlusIcon />
              </button>
            )}
          </div>
          {stock - quantity === 0 && <h2 className="text-sm font-medium text-red-500 pt-2">Stock tidak memenuhi</h2>}
        </div>
        <h2 className="font-medium pt-1">
          Subtotal : <span className="font-semibold">${(quantity * price).toFixed(1)}</span>
        </h2>
      </div>
    </div>
  );
};

export default CartProduct;
