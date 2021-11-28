const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
const validate = require("./validation");
const { ObjectId } = require("mongodb");

async function getAllProducts() {
  const prodCollection = await products();
  const allProducts = await prodCollection.find({}).toArray();

  // Change all _id values to strings
  return allProducts.map(validate.convertObjId);
}

async function getProductById(id) {
  if (!validate.validString(id)) throw "Product id must be a valid string.";
  let objId = ObjectId(id.trim());
  const prodCollection = await products();
  const prod = await prodCollection.findOne({ _id: objId });

  if (!prod) throw `No Product found with id=${id}.`;

  // Convert _id field to string before returning
  return validate.convertObjId(prod);
}

async function createProduct(
  productName,
  productPicture,
  productLinks,
  brand,
  price,
  category
) {
  if (!validate.validString(productName))
    throw "Product name must be a valid string.";
  if (!validate.validString(productPicture))
    throw "Product picture path Invalid";
  if (!validate.validString(brand))
    throw "Product Brand must be a valid string.";
  if (!validate.validString(category))
    throw "Product Category must be a valid string.";
  if (!validate.validnum(price)) throw "Enter valid Price value";
  if (!productLinks || !Array.isArray(productLinks))
    throw "You must provide an array of Product Links";

  if (productLinks.length === 0) {
    throw "You must provide at least one product Link.";
  } else {
    for (let i = 0; i < productLinks.length; i++) {
      const link = productLinks[i].trim();
      if (!validate.validLink(link))
        throw "Product external link must be a valid link.";
    }
  }

  const prodCollection = await products();
  const newProd = {
    productName: productName.trim(),
    productPicture: "public/uploads/noImg.jpg",
    productLinks: productLinks,
    brand: brand.trim(),
    price: price,
    category: category.trim(),
    overallRating: 0,
    likes: 0,
    reviews: [],
  };

  const insertInfo = await prodCollection.insertOne(newProd);
  if (insertInfo.insertedCount === 0)
    throw "Could not add Product to database.";
  const id = insertInfo.insertedId.toString();

  return await getProductById(id);
}

async function updateProduct(
  id,
  productName,
  productPicture,
  productLinks,
  brand,
  price,
  category
) {
  if (!validate.validString(id)) throw "Product id must be a valid string.";
  if (!validate.validString(productPicture))
    throw "Product picture path Invalid";
  if (!validate.validString(productName))
    throw "Product name must be a valid string.";
  if (!validate.validString(brand))
    throw "Product Brand must be a valid string.";
  if (!validate.validString(category))
    throw "Product Category must be a valid string.";
  if (!validate.validnum(price)) throw "Enter valid Price value";
  if (!productLinks || !Array.isArray(productLinks))
    throw "You must provide an array of Product Links";

  if (productLinks.length === 0) {
    throw "You must provide at least one product Link.";
  } else {
    for (let i = 0; i < productLinks.length; i++) {
      const link = productLinks[i].trim();
      if (!validate.validLink(link))
        throw "Product external link must be a valid link.";
    }
  }

  const prodCollection = await products();
  const prod = await getProductById(id);
  const updateProd = {
    productName: productName.trim(),
    productPicture: productPicture.trim(),
    productLinks: productLinks,
    brand: brand.trim(),
    price: price,
    category: category.trim(),
    overallRating: prod.overallRating,
    likes: prod.likes,
    reviews: prod.reviews,
  };

  id = ObjectId(id);

  const updatedInfo = await prodCollection.updateOne(
    { _id: id },
    { $set: updateProd }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update restaurant";
  }

  return await getProductById(id.toString());
}

async function remove(id) {
  if (!validate.validString(id)) throw "Product id must be a valid string.";

  const delprod = await getProductById(id);
  if (delprod == null) throw "Product Not found";
  const prodCollection = await products();
  id = ObjectId(id);
  const deletionInfo = await prodCollection.deleteOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete Product with id of ${id}`;
  }

  return `${delprod._id}`;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  remove,
};
