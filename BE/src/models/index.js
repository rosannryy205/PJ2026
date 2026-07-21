const Brand = require("./brandModel");
const Product = require("./productModel");
const ProductVariant = require("./productVariantModel");
const ProductImage = require("./productImageModel");
const Category = require("./categoryModel");
const CategoryBrand = require("./categoryBrandModel");
const Cart = require("./cartModel");
const CartItem = require("./cartItemModel");
const { sequelize } = require("../config/db");

// 1 Thương hiệu có nhiều sản phẩm
Brand.hasMany(Product, { foreignKey: "brand_id", as: "products" });
Product.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });

// 1 Sản phẩm có nhiều biến thể
Product.hasMany(ProductVariant, { foreignKey: "product_id", as: "variants" });
ProductVariant.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

// 1 Sản phẩm có nhiều hình ảnh
Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product_images",
});

// 1 Danh mục có nhiều thương hiệu
Category.hasMany(CategoryBrand, {
  foreignKey: "category_id",
  as: "category_brands",
});
CategoryBrand.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// 1 Thương hiệu có nhiều danh mục
Brand.hasMany(CategoryBrand, { foreignKey: "brand_id", as: "category_brands" });
CategoryBrand.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });

// 1 Cart có nhiều CartItem
Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart" });

// 1 ProductVariant có nhiều CartItem
ProductVariant.hasMany(CartItem, {
  foreignKey: "product_variant_id",
  as: "cart_items",
});
CartItem.belongsTo(ProductVariant, {
  foreignKey: "product_variant_id",
  as: "variant",
});

module.exports = {
  sequelize,
  Brand,
  Product,
  ProductVariant,
  ProductImage,
  Category,
  CategoryBrand,
  Cart,
  CartItem,
};
