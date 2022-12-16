import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStock } from "../../../features/product/productSlice";

const CartProductAdmin = ({ item, index }) => {
    const { id, image, title, category, stock } = item;
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
        <div className="w-full flex text-primary border-b-2 py-3 container">
            <div className="w-24">
                <img
                    src={image}
                    alt={title}
                    className="w-28 h-28 object-scale-down"
                />
            </div>
            <div className="container">
                <div className="w-full flex flex-col">
                    <h1 className="pl-4 font-bold text-sm">
                        {title} <br />
                        <span className="font-semibold text-xs">
                            {category}
                        </span>
                    </h1>
                </div>
            </div>
            <div className="w-20">
                <div>
                    <h4 className="text-center text-sm pb-1">Stock</h4>
                    <input
                        className="w-16 text-center border border-blueButton rounded-full text-sm"
                        onChange={handleStock}
                        value={stockProduct}
                    ></input>
                </div>
                <div className="pt-1">
                    <button
                        onClick={handleUpdate}
                        className="w-16 rounded-full bg-blueButton brightness-125 px-3 py-1 font-bold text-white text-xs transition duration-200 ease-in-out hover:bg-blueButton hover:brightness-100"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartProductAdmin;
