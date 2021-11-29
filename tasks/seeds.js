const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const reviews = data.reviews;
const products = data.products;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const first = await products.createProduct(
    "Highliner Liquid Gel Eyeliner",
    "/public/uploads/highliner.jpg",
    [
      "https://www.sephora.com/product/highliner-liquid-gel-eyeliner-P451610?skuId=2281087",
    ],
    "Marc Jacobs Beauty",
    14.0,
    "Eye-makeup"
  );

  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );

  const second = await products.createProduct(
    "Highliner Liquid Gel Eyeliner",
    "/public/uploads/highliner.jpg",
    [
      "https://www.sephora.com/product/highliner-liquid-gel-eyeliner-P451610?skuId=2281087",
    ],
    "Marc Jacobs Beauty",
    14.0,
    "Eye-makeup"
  );

  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );

  // await products.updateProduct(
  //   first._id,
  //   "Highliner Liquid Gel Eyeliner",
  //   "/public/uploads/highliner.jpg",
  //   [
  //     "https://www.sephora.com/product/highliner-liquid-gel-eyeliner-P451610?skuId=2281087",
  //   ],
  //   "Marc Jacobs Beauty",
  //   14,
  //   "Eye"
  // );

  // await products.remove(second._id);

  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );
  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );

  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );
  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );
  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );

  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );
  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );

  await products.createProduct(
    "24/7 Glide-On Waterproof Eyeliner Pencil",
    "/public/uploads/24-7.jpg",
    [
      "https://www.sephora.com/product/24-7-glide-on-eye-pencil-P133707?skuId=1393693",
    ],
    "Urban Decay",
    22.0,
    "Eye-makeup"
  );

  await users.createUser(
    "rachshah2",
    "/public/uploads/profile.jpg",
    "Rachna",
    "Shah",
    "shopping",
    "rachshah@gmail.com",
    "Intermediate"
  );

  await users.createUser(
    "nevil123",
    "/public/uploads/profile.jpg",
    "Nevil",
    "Ghelani",
    "Macbooklover",
    "nghelani@gmail.com",
    "Basic"
  );
  await users.createUser(
    "Lisaand1",
    "/public/uploads/noImg.jpg",
    "Lisa",
    "Andrew",
    "mylifelove",
    "l_andrew@gmail.com",
    "Advanced"
  );

  console.log("Done seeding database");

  await db.serverConfig.close();
}
main();
