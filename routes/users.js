const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", async (req, res) => {
  try {
    const users = await userData.getUserById(req.session.user._id.toString());
    res.render("users", { users: users, user: req.session.user });
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

router.post("/wishlist/:prodId", async (req, res) => {
  try {
    await userData.addToWishList(
      req.session.user._id.toString(),
      req.params.prodId
    );
    return res.json("Success");
  } catch (e) {
    return res.status(404).send({ error: e });
  }
});



router.post("/profile", async (req, res) => {
  const {
    userName,
    userImage,
    firstName,
    lastName,
    password,
    email,
    makeupLevel,
  } = req.body;
  if (!userName) {
    res.status(400).json({ error: "You must provide User name" });
    return;
  }
  // if (!userImage) {
  //   res.status(400).json({ error: "You must provide User picture" });
  //   return;
  // }
  if (!firstName) {
    res.status(400).json({ error: "You must provide User's firstName" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ error: "You must provide User's lastName" });
    return;
  }

  if (!email) {
    res.status(400).json({ error: "You must provide email Id" });
    return;
  }
  if (!makeupLevel) {
    res.status(400).json({ error: "You must provide makeup level" });
    return;
  }

  try {
    const user = await userData.updateUser(
      req.session.user._id,
      userName,
      userImage,
      firstName,
      lastName,
      password,
      email,
      makeupLevel
    );
    req.session.user = user;
    res.redirect("/users");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/signup", async (req, res) => {
  if(!req.body){
    res.status(401).render("users/signup", {title: "Sign Up", error: "Error: Username or password was not provided"});
  }
  else if (!userName) {
    res.status(400).json({ error: "You must provide User name" });
  }
  else if (!firstName) {
    res.status(400).json({ error: "You must provide User's firstName" });
  }
  else if (!lastName) {
    res.status(400).json({ error: "You must provide User's lastName" });
  }
  else if (!password) {
    res.status(400).json({ error: "You must provide password" });
  }
  else if (!email) {
    res.status(400).json({ error: "You must provide email Id" });
  }
  else if (!makeupLevel) {
    res.status(400).json({ error: "You must provide makeup level" });
  }
  else {
      const {
      userName,
      firstName,
      lastName,
      password,
      email,
      makeupLevel,
    } = req.body;

    try {
      const user = await userData.createUser(
        userName,
        firstName,
        lastName,
        password,
        email,
        makeupLevel
      );
      req.session.user = user;
    } catch(e) {
      res.status(400).render("users/signup", {title: "Sign Up", error: "Error: " + e});
    }
    if(!userAdded){
      res.status(500).render("users/signup", {title: "Sign Up", error: "Error: Internal Server Error"});
    }
    else if(userAdded.userInserted == true){
      res.render("/", { user: req.session.user });
    }
    else{
      res.status(500).render("users/signup", {title: "Sign Up", error: "Error: Internal Server Error"});
    }
  }
  
});

router.put("/users", async (req, res) => {
  const {
    userName,
    userImage,
    firstName,
    lastName,
    password,
    email,
    makeupLevel,
  } = req.body;
  if (!userName) {
    res.status(400).json({ error: "You must provide User name" });
    return;
  }
  if (!userImage) {
    res.status(400).json({ error: "You must provide User picture" });
    return;
  }
  if (!firstName) {
    res.status(400).json({ error: "You must provide User's firstName" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ error: "You must provide User's lastName" });
    return;
  }
  if (!password) {
    res.status(400).json({ error: "You must provide password" });
    return;
  }
  if (!email) {
    res.status(400).json({ error: "You must provide email Id" });
    return;
  }
  if (!makeupLevel) {
    res.status(400).json({ error: "You must provide makeup level" });
    return;
  }
  try {
    const user = await userData.updateUser(
      req.params.id,
      userName,
      userImage,
      firstName,
      lastName,
      password,
      email,
      makeupLevel
    );
    res.json(user);
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = await userData.remove(req.params.id);
    res.json({ userId: userId, deleted: true });
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
