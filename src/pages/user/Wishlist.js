import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "../../assets/icons/icon-svg/iconSvg";
import ProductCards from "../../components/user/product-card/ProductCards";

const Wishlist = () => {
  const { saved, products, login } = useSelector((store) => store.product);
  const savedLogin = saved.filter((save) => save.userId === login.id);
  let savedProducts = [];
  for (let itemLogin of savedLogin) {
    savedProducts.push(products.find((product) => product.id === itemLogin.productId));
  }
  const navigate = useNavigate();

  useEffect(() => {
    !login.id && navigate("/");
  });

  return (
    <section id="wishlist" className="pt-12 pb-10 lg:pt-16 font-quicksand bg-white">
      <div
        className="w-full h-96 bg-cover bg-fixed bg-center bg-no-repeat overflow-hidden flex justify-center items-center text-center relative"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)` }}
      >
        <div className="w-full h-full bg-slate-400 mix-blend-multiply"></div>
        <div className="absolute flex flex-col justify-center items-center text-white">
          <h1 className="text-white text-4xl font-semibold">Cart</h1>
          <div className="py-2 [&>*]:pr-1 flex flex-wrap justify-evenly items-center capitalize">
            <HomeIcon />
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-medium text-lg text-white transition ease-in-out duration-200 hover:text-secondary">
              Home
            </Link>
            <ChevronRightIcon />
            <h3 className="font-medium text-lg text-white">Wishlist</h3>
          </div>
        </div>
      </div>
      <div className="container px-8 lg:px-20 pt-14 pb-10">
        <div className="text-center flex justify-center items-center pb-14">
          <h1 className=" font-quicksand font-bold text-4xl text-primary border-x-[3px] border-secondary px-10 uppercase">Wishlist Product</h1>
        </div>
        {saved.length === 0 ? (
          <div className="h-56 flex justify-center items-center capitalize font-bold">No Wishlist</div>
        ) : (
          <div className="grid justify-center gap-7 md:grid-cols-2 xl:grid-cols-4">{savedProducts && savedProducts.map((item, index) => <ProductCards item={item} index={index} key={index} />)}</div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
