import { v2 as cloudinary } from "cloudinary";
import productModel from "../Models/productModel.js";

// const decrementQuantity = async (req, res) => {
//   const { productId } = req.params;
//   const { size, quantity } = req.body;

//   try {
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const sizeIndex = product.sizes.findIndex((item) => item.size === size);

//     if (sizeIndex === -1) {
//       return res.status(400).json({ message: "Size not found" });
//     }

//     const selectedSize = product.sizes[sizeIndex];

//     if (selectedSize.quantity < quantity) {
//       return res.status(400).json({ message: "Not enough stock" });
//     }

//     // Decrease the stock by the selected quantity
//     product.sizes[sizeIndex].quantity -= quantity;

//     await product.save();
//     return res.status(200).json({ message: "Stock updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// FUnction for add product 
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image" 
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false ,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(), 
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save()

    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for list products 
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
    res.json({ success: false, message: error.message });
        
    }
};

// FUnction for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
};

// Function for single product info 
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId);
        res.json({ success: true, product})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
};

export { addProduct, listProducts, removeProduct, singleProduct};
