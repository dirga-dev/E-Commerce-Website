import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCards from "../product-card/ProductCards";

const ProductCategory = () => {
  let { products, isLoading } = useSelector((store) => store.product);
  let { category } = useParams();
  category = category ? category.replace("-", " ") : "products";

  products = category === "products" ? products : products.filter((product) => product.category === category);

  return (
    <section className="pt-14 pb-28" id="all-category">
      {isLoading && <h1>Loading ...</h1>}
      <div className="container px-8 lg:px-20 font-quicksand flex flex-col justify-center items-center">
        <div className="grid justify-center gap-7 md:grid-cols-2 xl:grid-cols-4">{products && products.map((item, index) => <ProductCards item={item} index={index} key={index} />)}</div>
      </div>
    </section>
  );
};

export default ProductCategory;
