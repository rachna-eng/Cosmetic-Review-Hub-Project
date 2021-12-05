const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
// const users = mongoCollections.users;
const usersData = require("../data/users");
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
  category,
  status = "pending",
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
    productPicture: productPicture,
    productLinks: productLinks,
    brand: brand.trim(),
    price: price,
    category: category.trim(),
    overallRating: 0,
    likes: 0,
    reviews: [],
    status: status,
  };

  const insertInfo = await prodCollection.insertOne(newProd);
  if (insertInfo.insertedCount === 0)
    throw "Could not add Product to database.";
  const id = insertInfo.insertedId.toString();

  return await getProductById(id);
}
async function getProductByStatus(id){
  const pendingCollection = await products();
  const prod = await pendingCollection.find({id}).toArray();

  return await prod.name;
}



async function updateProduct(
  id,
  productName,
  productPicture,
  productLinks,
  brand,
  price,
  category,
  status,
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
    status:prod.status,
  };

  id = ObjectId(id);

  const updatedInfo = await prodCollection.updateOne(
    { _id: id },
    { $set: updateProd }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update Product";
  }

  return await getProductById(id.toString());
}

async function searchProducts(keyword) {
  const prodCollection = await products();

  const prod = await prodCollection.find( { $text: { $search: keyword} },{ score: { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } )

  // Convert _id field to string before returning
  return prod.map(validate.convertObjId);
}

// async function remove(id) {
//   if (!validate.validString(id)) throw "Product id must be a valid string.";

//   const delprod = await getProductById(id);
//   if (delprod == null) throw "Product Not found";
//   const prodCollection = await products();
//   id = ObjectId(id);
//   const deletionInfo = await prodCollection.deleteOne({ _id: id });

//   if (deletionInfo.deletedCount === 0) {
//     throw `Could not delete Product with id of ${id}`;
//   }

//   return `${delprod._id}`;
// }

async function addToreviews(userId, prodId, title, reviewBody, rating) {
  const user = await usersData.getUserById(userId.toString());
  let date = new Date().toUTCString();
  if (!title) {
    throw "Add Review Title";
  }
  if (!reviewBody) {
    throw "Review Cannot be empty";
  }
  if (!rating) {
    throw "Add Rating";
  }
  if (!user) {
    throw "Login Before you add review";
  } else {
    if (!validate.validString(title)) throw "Title must be a valid string.";
    if (!validate.validString(reviewBody))
      throw "Reviews text must be a valid string.";
    if (!validate.validnum(rating) || rating > 5 || rating < 0)
      throw "rating should be between 0-5";
    rating = parseFloat(rating);
    const prodCollection = await products();
    // const prod = await getProductById(prodId);
    const addreview = {
      productId: prodId,
      userId: userId,
      userName: user.userName,
      userImage: user.userImage,
      date: date,
      title: title,
      reviewBody: reviewBody,
      rating: rating,
      likes: 0,
      Comments: [],
    };
    prodId = ObjectId(prodId);
    const updatedInfo = await prodCollection.updateOne(
      { _id: prodId },
      { $push: { reviews: addreview } }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "Could not add review";
    }

    //new

    const prod = await getProductById(prodId.toString());
    let overallRating = 0;
    prod.reviews.forEach((review) => {
      overallRating = overallRating + review.rating;
    });
    if (prod.reviews.length != 0)
      overallRating = overallRating / prod.reviews.length;

    const ratingUpdateInfo = await prodCollection.updateOne(
      { _id: prodId },
      { $set: { overallRating: overallRating } }
    );
    if (ratingUpdateInfo.matchedCount === 0)
      throw "Could not update overall rating";

    const product = await getProductById(prodId.toString());
    return product;
  }
}



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  addToreviews,
  searchProducts,
  getProductByStatus,
};
