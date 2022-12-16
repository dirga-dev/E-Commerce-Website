import React from "react";

const CartRekapTable = ({ item, index }) => {
  return (
    <tr className="[&>td]:px-3 [&>td]:py-3 [&>td]:text-base">
      <td className="text-center font-bold">{index + 1}</td>
      <td className="font-bold">
        <h1>{item.title}</h1>
        <p className="text-gray-500 text-xs">{item.category}</p>
      </td>
      <td className="text-right  font-semibold">${item.price}</td>
      <td className="text-center font-light">{item.quantity}</td>
      <td className="text-right font-bold">${(item.price * item.quantity).toFixed(1)}</td>
    </tr>
  );
};

export default CartRekapTable;
