const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");

//GET /api/users/:id
router.get("/:id", isTokenValid, async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
