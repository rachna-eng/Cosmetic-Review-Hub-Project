const productsRoutes = require("./products.js");
const reviewsRoutes = require("./reviews.js");
const usersRoutes = require("./users.js");
const usersData = require("../data").users;

const constructorMethod = (app) => {
  app.use("/products", productsRoutes);
  app.use("/reviews", reviewsRoutes);
  app.use("/users", usersRoutes);

  app.get("/", (req, res) => {
    return res.render("index", { user: req.session.user });
  });

  app.get("/logout", (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  });
  app.get("/login", (req, res) => {
    return res.render("login", { user: req.session.user });
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      res.status(400).json({ error: "You must provide User name" });
      return;
    }
    if (!password) {
      res.status(400).json({ error: "You must provide User password" });
      return;
    }
    try {
      const user = await usersData.login(username, password);
      req.session.user = user;
      res.render("index", { user: req.session.user });
    } catch (e) {
      res.render("login", { user: req.session.user, error: e });
    }
  });

  app.get("/signup", (req, res) => {
    return res.render("signup", { user: req.session.user });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
