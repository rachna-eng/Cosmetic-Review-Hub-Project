const productsRoutes = require("./products.js");
//const reviewsRoutes = require("./reviews.js");
const usersRoutes = require("./users.js");
const adminRoutes = require("./admin.js");
const usersData = require("../data").users;

const constructorMethod = (app) => {
  app.use("/products", productsRoutes);
  //app.use("/reviews", reviewsRoutes);
  app.use("/users", usersRoutes);
  app.use("/admin", adminRoutes);

  app.get("/", (req, res) => {
    return res.render("landing/landing", { user: req.session.user });
  });

  app.use("*", (req, res) => {
    res.status(404).render("landing/error", { error: "Not found" , user: req.session.user });
  });
};

module.exports = constructorMethod;
