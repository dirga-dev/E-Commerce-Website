import React from "react";
import { useSelector } from "react-redux";
import { CartOutlineIcon } from "../../assets/icons/icon-svg/iconSvg";
import CartRekap from "../../components/admin/recapitulation/CartRekap";
import CartRekapTable from "../../components/admin/recapitulation/CartRekapTable";

const TableRecap = () => {
  const { recap, products } = useSelector((store) => store.product);
  let totalRecap = 0;
  let productRecap = [];
  for (let itemRecap of recap) {
    for (let prods of itemRecap.product) {
      let productFind = products.find((item) => item.id === prods.idProduct);
      productRecap.push({ id: productFind.id, title: productFind.title, category: productFind.category, price: productFind.price, quantity: prods.quantity });
      totalRecap += productFind.price * prods.quantity;
    }
  }
  return (
    <section id="sales-recap" className="pt-16 font-quicksand bg-white">
      <div className="container pb-28 min-h-screen">
        <h1 className="pt-10 text-center font-bold uppercase text-2xl">Sales recapitulation</h1>
        {productRecap.length > 0 ? (
          <div>
            <div className="hidden pt-5 p-1.5 w-full md:flex flex-col justify-center items-center">
              <table className="border w-3/5 divide-y divide-gray-200">
                <thead className="bg-gray-5 ">
                  <tr className="[&>th]:px-6 [&>th]:py-3 [&>th]:text-sm [&>th]:font-bold [&>th]:uppercase [&>th]:text-gray-500">
                    <th className="text-center">No</th>
                    <th className="min-w-[20rem] text-center">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Income</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productRecap.map((item, index) => (
                    <CartRekapTable item={item} key={index} index={index} />
                  ))}
                  <tr className="bg-indigo-700 opacity-80 text-white">
                    <th colSpan={4} className="text-center px-3 py-3 text-base font-bold">
                      Total
                    </th>
                    <th className="text-right  px-3 py-3 text-base font-bold">$ {totalRecap.toFixed(1)}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex md:hidden justify-start items-start pb-10">
              <div className="w-full">
                <div className="grid justify-center md:grid-cols-2 xl:grid-cols-4 pt-6">
                  <div className="w-full flex text-primary border-b-2 py-2 container">
                    <div className="text-center text-xs w-[2rem]">No</div>
                    <div className="text-center font-medium text-xs w-[12rem]">Product</div>
                    <div className="text-center w-[3rem] text-xs">Qty</div>
                    <div className="text-left pl-4 w-[4rem] text-xs">Price</div>
                  </div>
                  {productRecap.map((item, index) => (
                    <CartRekap item={item} key={index} index={index} />
                  ))}
                  <div className="bg-indigo-700 opacity-90 text-white w-full flex border-b-2 py-2 container">
                    <div className="text-center w-full text-xs font-bold ">Total</div>
                    <div className="text-right pl-4 w-[4.7rem] text-xs">$ {totalRecap.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-52 flex flex-col justify-center items-center">
            <CartOutlineIcon />
            <h1 className="pt-5 font-bold text-xl tracking-widest">No Cart</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default TableRecap;
