import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStock } from "../../../features/product/productSlice";

const CartProductAdminTable = ({ item, index }) => {
  const { id, image, title, description, category, stock } = item;
  const [stockProduct, setStockProduct] = useState(stock ? stock : 0);
  const dispatch = useDispatch();

  const handleStock = (e) => {
    e.preventDefault();
    setStockProduct(e.target.value >= 0 ? e.target.value : 0);
  };

  const handleUpdate = () => {
    dispatch(updateStock({ id: id, stock: stockProduct }));
  };

  return (
    <tr className="align-top [&>td]:px-2 [&>td]:py-2">
      <td className="text-center">{index + 1}</td>
      <td className="w-28 h-28">
        <img src={image} alt="" />
      </td>
      <td>
        <h1 className="text-base font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
        <br />
        <p className="text-xs font-bold opacity-50">{category}</p>
      </td>
      <td className="text-center">
        <input className="border border-blueButton rounded-full w-16 text-center" onChange={handleStock} value={stockProduct}></input>
      </td>
      <td className="text-center">
        <button onClick={handleUpdate} className="rounded-full bg-blueButton brightness-125 px-3 py-1 font-bold text-white text-sm transition duration-200 ease-in-out hover:bg-blueButton hover:brightness-100">
          Update
        </button>
      </td>
    </tr>
  );
};

export default CartProductAdminTable;
