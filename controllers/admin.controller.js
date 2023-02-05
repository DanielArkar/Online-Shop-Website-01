const Product = require("../models/product.model");

function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  await product.save();

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
