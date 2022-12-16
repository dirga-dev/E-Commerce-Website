import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCards from "../../components/user/product-card/ProductCards";
import { HomeIcon, ChevronRightIcon, MinusIcon, PlusIcon, CartIcon } from "../../assets/icons/icon-svg/iconSvg";
import { addCart } from "../../features/product/productSlice";

const DetailProduct = () => {
  const id = Number(useParams().id);
  const { products, carts, login } = useSelector((store) => store.product);
  let product = products ? products.find((product) => product.id === id) : "";
  let inCart = carts ? carts.find((cart) => cart.product.idProduct === id) : null;
  const relatedProducts = products ? products.filter((relatedProduct) => relatedProduct.category === product.category) : "";
  const [quantity, setQuantity] = useState(inCart ? inCart.product.quantity : 1);
  const dispatch = useDispatch();
  let location,
    { pathname } = useLocation();
  const locations = pathname.substring(1).split("/");
  const navigate = useNavigate();

  const handleQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleCart = () => {
    if (!login.id) {
      navigate("/login", { state: { from: location, hallo: "hallo" } });
    }
    if (login.id) {
      dispatch(addCart({ id: id, quantity: quantity }));
      navigate("/cart");
    }
  };

  if (product) {
    return (
      <section className="pt-16 pb-28 font-quicksand">
        <div
          className="w-full h-96 bg-fixed overflow-hidden flex justify-center items-center text-center relative"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)` }}
        >
          <div className="w-full h-full bg-slate-400 mix-blend-multiply"></div>
          <div className="absolute flex flex-col justify-center items-center text-white">
            <h1 className="text-white text-4xl font-semibold">{product.title}</h1>
            <div className="py-2 [&>*]:pr-1 flex flex-wrap justify-evenly items-center capitalize">
              <HomeIcon />
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-medium text-lg text-white transition ease-in-out duration-200 hover:text-secondary">
                Home
              </Link>
              <ChevronRightIcon />
              {locations.map((location, index) =>
                index + 1 <= locations.length - 1 ? (
                  <Link to={`/${location}`} onClick={() => window.scrollTo(0, 792)} className="font-medium text-lg text-white transition ease-in-out duration-200 hover:text-secondary" key={index}>
                    {location}
                  </Link>
                ) : (
                  ""
                )
              )}
              <ChevronRightIcon />
              <h3 className="font-medium text-lg text-white">{product.title}</h3>
            </div>
          </div>
        </div>
        <div className="container bg-white py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <div className="w-full lg:w-1/2 p-10 flex justify-center">
              <img src={product.image} alt={product.title} className="w-full h-96 object-scale-down" />
            </div>
            <div className="w-full min-h-[29rem] lg:w-1/2 p-4 flex flex-col justify-between">
              <div className="w-full mb-10 lg:mb-0">
                <h1 className="font-semibold text-3xl text-primary">{product.title}</h1>
                <h2 className="font-semibold text-2xl text-secondary mt-3">$ {product.price}</h2>
              </div>
              <div className="w-full border-t-[3px] mb-10 lg:mb-0"></div>
              <div className="w-full mb-10 lg:mb-0">
                <p className="font-medium">{product.description}</p>
              </div>
              <div className="w-full border-t-[3px] mb-10 lg:mb-0"></div>
              <div className="w-full min-h-[7rem] flex flex-wrap justify-start items-center mb-10 lg:mb-0">
                <div className="flex flex-beetwen items-center">
                  <span className="font-medium text-lg mr-10">QTY</span>
                  <div className="w-32 px-5 py-2 mr-5 bg-slate-50 shadow-md rounded-full flex justify-between">
                    <button className="transition ease-in-out duration-200 hover:text-secondary" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                      <MinusIcon />
                    </button>
                    <input type="number" value={quantity} onChange={handleQuantity} className="min-w-[1rem] rounded-full text-center" />
                    {product.stock - quantity === 0 ? (
                      <button className="transition ease-in-out duration-200 hover:text-secondary capitalize" disabled>
                        Max
                      </button>
                    ) : (
                      <button className="transition ease-in-out duration-200 hover:text-secondary" onClick={() => setQuantity(quantity < product.stock ? quantity + 1 : quantity)}>
                        <PlusIcon />
                      </button>
                    )}
                  </div>
                </div>

                {product.stock === 0 ? (
                  <button className="cursor-not-allowed font-medium text-base text-white px-5 py-2 mr-5 flex items-center bg-secondary rounded-full shadow-sm transition ease-in-out duration-200 hover:brightness-110 hover:shadow-md">
                    <CartIcon /> <span className="ml-2 capitalize">Out of Stock</span>
                  </button>
                ) : (
                  <button onClick={handleCart} className="font-medium text-base text-white px-5 py-2 mr-5 flex items-center bg-blueButton rounded-full shadow-sm transition ease-in-out duration-200 hover:brightness-110 hover:shadow-md">
                    <CartIcon /> <span className="ml-2 capitalize">Add To Cart</span>
                  </button>
                )}
              </div>
              <div className="full flex mb-10 lg:mb-0">
                <h4 className="font-medium text-base uppercase">
                  Category :
                  <Link to={`/${product.category.replace(" ", "-")}`} onClick={() => window.scrollTo(0, 792)} className="ml-3 capitalize text-primary transition ease-in-out duration-300 hover:text-secondary">
                    {product.category}
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-32 px-8 lg:px-20 flex flex-col justify-center items-center text-center">
          <h1 className="font-bold text-4xl text-primary border-x-[3px] border-secondary px-10 uppercase">Related Product</h1>
          <div className="pt-16 grid justify-center gap-7 md:grid-cols-2 xl:grid-cols-4">{relatedProducts && relatedProducts.map((item, index) => (index + 1 <= 4 ? <ProductCards item={item} index={index} key={index} /> : ""))}</div>
        </div>
      </section>
    );
  }
};

export default DetailProduct;
