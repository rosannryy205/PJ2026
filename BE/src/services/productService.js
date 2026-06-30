const {
  Product,
  ProductVariant,
  Brand,
  ProductImage,
  Category,
} = require("../models/index.js");

const getAllProducts = async (category_slug, brand_slug) => {
  // Yêu cầu: cả 2 điều kiện phải hợp lệ (AND). Sai 1 trong 2 => loại toàn bộ => []
  if (!category_slug) {
    return [];
  }

  try {
    // Tìm Category theo slug
    const category = await Category.findOne({
      where: { slug: category_slug },
    });

    if (!category) return [];  // Kiểm tra object, không phải slug

    const whereCondition = {
      category_id: category.id,
    }


    if(brand_slug){

    const brand = await Brand.findOne({
      where: { slug: brand_slug },  // Tìm Brand theo slug
    });

    if (brand){
      whereCondition.brand_id = brand.id
      }
    }
   
    // Dùng category.id và brand.id
    const products = await Product.findAll({
      where: whereCondition,
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: ProductVariant,
          as: "variants",
        },
        {
          model: ProductImage,
          as: "images",
        },
      ],
    });

    return products;
  } catch (error) {
    throw error;
  }
};

const getAllProductFeatures = async () => {
  const features = await Product.findAll({
    include: [
      {
        model: Brand,
        as: "brand",
      },
      {
        model: ProductVariant,
        as: "variants",
      },
      {
        model: ProductImage,
        as: "images",
      },
    ],
    order: [["created_at", "DESC"]],
    limit: 10, // Giới hạn số lượng sản phẩm trả về
  });
  return features;
};

const getAllProductPopular = async () => {
  const features = await Product.findAll({
    include: [
      {
        model: Brand,
        as: "brand",
      },
      {
        model: ProductVariant,
        as: "variants",
      },
      {
        model: ProductImage,
        as: "images",
      },
    ],
    order: [["sold_count", "DESC"]],
    limit: 10, // Giới hạn số lượng sản phẩm trả về
  });
  return features;
};

const getAllProductNewArrival = async () => {
  const newarrival = await Product.findAll({
    include: [
      {
        model: Brand,
        as: "brand",
      },
      {
        model: ProductVariant,
        as: "variants",
      },
      {
        model: ProductImage,
        as: "images",
      },
    ],
    order: [["created_at", "DESC"]],
    limit: 10, // Giới hạn số lượng sản phẩm trả về
  });
  return newarrival;
}

const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Brand,
        as: "brand",
      },
      {
        model: ProductVariant,
        as: "variants",
      },
      {
        model: ProductImage,
        as: "images",
      },
    ],
  });
  return product;
};

module.exports = {
  getAllProducts,
  getAllProductFeatures,
  getAllProductPopular,
  getAllProductNewArrival,
  getProductById,
};
