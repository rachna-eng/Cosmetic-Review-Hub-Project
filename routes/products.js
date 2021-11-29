const express = require("express");
const router = express.Router();
const data = require("../data");
const productData = data.products;

router.get("/:id", async (req, res) => {
  try {
    const product = await productData.getProductById(req.params.id);
    res.render("single", { product: product, user: req.session.user });
  } catch (e) {
    res.status(404).json({ error: "Product not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const productList = await productData.getAllProducts();
    res.render("products", { products: productList, user: req.session.user });
  } catch (e) {
    res.status(404).send({ error: e, user: req.session.user });
  }
});

router.post("/", async (req, res) => {
  const { productName, productPicture, productLinks, brand, price, category } =
    req.body;
  if (!productName) {
    res.status(400).json({ error: "You must provide product name" });
    return;
  }
  if (!productPicture) {
    res.status(400).json({ error: "You must provide picture" });
    return;
  }
  if (!productLinks) {
    res.status(400).json({ error: "You must provide provide links" });
    return;
  }
  if (!brand) {
    res.status(400).json({ error: "You must provide brand" });
    return;
  }
  if (!price) {
    res.status(400).json({ error: "You must provide product price" });
    return;
  }
  if (!category) {
    res.status(400).json({ error: "You must provide product category" });
    return;
  }

  try {
    const product = await productData.createProduct(
      productName,
      productPicture,
      productLinks,
      brand,
      price,
      category
    );
    res.json(product);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const { productName, productPicture, productLinks, brand, price, category } =
    req.body;
  if (!productName) {
    res.status(400).json({ error: "You must provide product name" });
    return;
  }
  if (!productPicture) {
    res.status(400).json({ error: "You must provide picture" });
    return;
  }
  if (!productLinks) {
    res.status(400).json({ error: "You must provide provide links" });
    return;
  }
  if (!brand) {
    res.status(400).json({ error: "You must provide brand" });
    return;
  }
  if (!price) {
    res.status(400).json({ error: "You must provide product price" });
    return;
  }
  if (!category) {
    res.status(400).json({ error: "You must provide product category" });
    return;
  }
  try {
    const product = await productData.updateProduct(
      req.params.id,
      productName,
      productPicture,
      productLinks,
      brand,
      price,
      category
    );
    res.json(product);
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const prodId = await productData.remove(req.params.id);
    res.json({ productId: prodId, deleted: true });
  } catch (e) {
    res.status(404).send({ error: e });
  }
});
module.exports = router;
