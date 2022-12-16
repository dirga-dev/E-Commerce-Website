import { useSelector } from "react-redux";
import CartProductAdmin from "../../components/admin/products/CartProductAdmin";
import CartProductAdminTable from "../../components/admin/products/CartProductAdminTable";

const ProductsAdmin = () => {
  const { products } = useSelector((store) => store.product);
  return (
    <section id="product" className="pt-16 font-quicksand">
      <div className="container pb-28 bg-white min-h-screen">
        <h1 className="pt-10 text-center font-bold uppercase text-2xl">Products</h1>
        <div className="hidden md:flex pt-5 p-1.5 w-full flex-col justify-center items-center">
          <table className="border w-3/5 divide-y divide-gray-200">
            <thead>
              <tr>
                <th>No</th>
                <th colSpan={2} className="min-w-[30rem] px-6 py-3 text-sm font-bold text-gray-500 uppercase ">
                  Product
                </th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase ">Stock</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase ">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">{products && products.map((item, index) => <CartProductAdminTable item={item} key={item.id} index={index} />)}</tbody>
          </table>
        </div>
        <div className="flex md:hidden justify-start items-start pb-10">
          <div className="w-full">
            <div className="grid justify-center gap-7 md:grid-cols-2 xl:grid-cols-4 pt-6">{products && products.map((item, index) => <CartProductAdmin item={item} key={item.id} index={index} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsAdmin;
