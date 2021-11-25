const productsRoutes = require("./products.js");
const reviewsRoutes = require("./reviews.js");
const usersRoutes = require("./users.js");

const constructorMethod = (app) => {
  app.use("/products", productsRoutes);
  app.use("/reviews", reviewsRoutes);
  app.use("/users", usersRoutes);

  app.get("/", (req, res) => {
    return res.render("index");
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
