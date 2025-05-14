
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };
  
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleSizeSelect = (selectedSize) => {
    setSize(selectedSize);
    const selectedSizeData = productData.sizes.find((item) => item.size === selectedSize);
    if (selectedSizeData && selectedSizeData.quantity < quantity) {
      setErrorMessage(`Only ${selectedSizeData.quantity} available for this size.`);
    } else {
      setErrorMessage("");
    }
  };

  const handleQuantityChange = (e) => {
    const selectedSizeData = productData.sizes.find((item) => item.size === size);
    const newQuantity = parseInt(e.target.value, 10);

    if (newQuantity > (selectedSizeData ? selectedSizeData.quantity : 0)) {
      setErrorMessage(`Only ${selectedSizeData ? selectedSizeData.quantity : 0} available for this size.`);
      setQuantity(selectedSizeData ? selectedSizeData.quantity : 0);
    } else {
      setQuantity(newQuantity);
      setErrorMessage("");
    }
  };

  const handleAddToCart = () => {
    if (size && quantity <= productData.sizes.find((item) => item.size === size).quantity) {
      addToCart(productData._id, size, quantity);
    } else {
      setErrorMessage("Quantity exceeds available stock.");
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ----------Product Data-----------  */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*-----------Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* ------Product Info----------  */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Select Size and Quantity */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.length > 0 ? (
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => handleSizeSelect(item.size)}
                    key={index}
                    disabled={item.quantity === 0}
                    className={`border border-gray-100 py-2 px-4 ${item.size === size ? 'border-orange-500' : ''} ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {item.size} {item.quantity === 0 ? '(Out of stock)' : `(${item.quantity})`}
                  </button>
                ))
              ) : (
                <p className="text-gray-400">No sizes available</p>
              )}
            </div>
            {size && (
              <div className="mt-4">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={productData.sizes.find((item) => item.size === size)?.quantity || 0}
                  className="border px-3 py-2 w-24"
                />
              </div>
            )}
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </div>

          <button
            onClick={handleAddToCart}
            className={`bg-black text-white px-8 py-3 active:bg-gray-700 text-sm ${!size || errorMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!size || errorMessage}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ----------Description & Review Section------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border text-sm px-5 py-3">Description</b>
          <p className="border text-sm px-5 py-3">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 border-gray-600 text-sm">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, quibusdam consectetur quis necessitatibus deserunt molestiae odio odit harum accusamus libero!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis id vel laudantium numquam facilis at recusandae, illo culpa.</p>
        </div>
      </div>

      {/* -----------Display Related Products---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;


// import React, { use } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/shopContext";
// import { useState, useContext, useEffect } from "react";
// import { assets } from "../assets/frontend_assets/assets";
// import RelatedProducts from "../components/RelatedProducts";

// const Product = () => {
//   const { productId } = useParams();
//   const { products,currency ,addToCart} = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         // console.log(item);
//         setImage(item.image[0]);
//         return null;
//       }
//     });
//   };

  

//   useEffect(() => {
//     fetchProductData();
//   }, [productId,products]);
 
//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* ----------Product Data-----------  */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/*-----------Product Images------------- */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {productData.image.map((item,index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img src={image} className="w-full h-auto" alt="" />
//           </div>
//         </div>
//         {/* ------Product Info----------  */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
//           <div className="flex items-center gap-1 mt-2 ">
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_dull_icon} alt="" className="w-3.5" />
//             <p className="pl-2">(122)</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
//           <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">{productData.sizes && productData.sizes.length > 0 ? (
//       productData.sizes.map((item, index) => (
//         <button
//           onClick={() => setSize(item.size)}
//           key={index}
//           disabled={item.quantity === 0}
//           className={`border border-gray-100 py-2 px-4 ${
//             item.size === size ? 'border-orange-500' : ''
//           } ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {item.size} {item.quantity === 0 ? '(Out of stock)' : `(${item.quantity})`}
//         </button>
//       ))
//     ) : (
//       <p className="text-gray-400">No sizes available</p>
//     )}</div>
//           </div>
//                   <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 active:bg-gray-700 text-sm">ADD TO CART</button>
//                   <hr className="mt-8 sm:w-4/5"/>
//                   <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1"> 
//                     <p>100% Original product.</p>
//                     <p>Cash on delivery is available on this products.</p>
//                     <p>Easy return and exchange policy within 7 days.</p>
//                   </div>
//                   </div>
//                   </div>
                  
//                 {/* ----------Description & Review Section-------------  */}
//                 <div className="mt-20">
//                   <div className="flex">
//                     <b className="border text-sm px-5 py-3">Description</b>
//                     <p className="border text-sm px-5 py-3">Reviews (122)</p>
//                   </div>

//                   <div className="flex flex-col gap-4 border px-6 py-6 border-gray-600 text-sm">
//                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, quibusdam consectetur quis necessitatibus deserunt molestiae odio odit harum accusamus libero!</p>
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis id vel laudantium numquam facilis at recusandae, illo culpa.</p>
//                     </div>
//                </div>

//                {/* -----------Display Related Products----------  */}

//                <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
          
//         </div>
     
    
//   ) : <div className="opacity-0"></div>
    
// };

// export default Product;

