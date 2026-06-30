
const { getAllProducts, getAllProductFeatures, getAllProductPopular, getAllProductNewArrival, getProductById, } = require("../services/productService");

const getAllProductsController = async (req, res, next) => {
  try {
    const { category, brand} = req.query;
    // Yêu cầu: trả về đúng sản phẩm thỏa BOTH điều kiện (AND).
    // Nếu sai 1 trong 2 (thiếu/không hợp lệ) => loại toàn bộ => []
    if (!category) {
      return res.status(200).json({ success: true, data: [] });
    }

    const products = await getAllProducts(category, brand);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

const getAllProductFeaturesController = async (req, res, next) => {
  try {
    const features = await getAllProductFeatures();
    res.status(200).json({ success: true, data: features });
  } catch (error) {
    next(error);
  }
};

const getAllProductPopularController = async (req, res, next) => {
  try {
    const popularProducts = await getAllProductPopular();   
    res.status(200).json({ success: true, data: popularProducts });
  } catch (error) {
    next(error);
  }
};

const getAllProductNewArrivalController = async (req, res, next) => {
  try {
    const newArrivalProducts = await getAllProductNewArrival();   
    res.status(200).json({ success: true, data: newArrivalProducts });
  } catch (error) {
    next(error);
  }
};

const getProductByIdController = async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    } 
    return res.status(200).json({ success: true, data: product });  
  } catch (error) {
    next(error);
  } 
};



module.exports = {
  getAllProducts: getAllProductsController,
  getAllProductFeatures: getAllProductFeaturesController,
  getAllProductPopular: getAllProductPopularController,
  getProductById: getProductByIdController,
  getAllProductNewArrival: getAllProductNewArrivalController
};
