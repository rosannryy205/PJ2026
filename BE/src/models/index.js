const Brand = require('./brandModel');
const Product = require('./productModel');
const ProductVariant = require('./productVariantModel');
const ProductImage = require('./productImageModel');
const Category = require('./categoryModel');
const CategoryBrand = require('./categoryBrandModel');

// 1 Thương hiệu có nhiều sản phẩm
Brand.hasMany(Product, { foreignKey: 'brand_id', as: 'products' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

// 1 Sản phẩm có nhiều biến thể
Product.hasMany(ProductVariant, { foreignKey: 'product_id', as: 'variants' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id', as: 'product_variants' });

// 1 Sản phẩm có nhiều hình ảnh
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product_images' });

// 1 Danh mục có nhiều thương hiệu
Category.hasMany(CategoryBrand, { foreignKey: 'category_id', as: 'category_brands' });
CategoryBrand.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// 1 Thương hiệu có nhiều danh mục
Brand.hasMany(CategoryBrand, { foreignKey: 'brand_id', as: 'category_brands' });
CategoryBrand.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });



module.exports = { Brand, Product, ProductVariant, ProductImage, Category, CategoryBrand };