const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");

//POST /auth/singup
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);

  if (!email || !password || !name) {
    res.status(400).json({ message: "todos los campos son obligatorios" });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({ message: "necesita 8 caracteres 1 mayuscula y 1 numero" });
    return;
  }

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res.status(400).json({ message: "no esta bien configurado el email" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser !== null) {
      res.status(400).json({ message: "usuario exsistente" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    await User.create({
      email,
      password: hashPassword,
      name,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//POST /auth/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "email y password oblgatorios" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser === null) {
      res.status(400).json({ message: "usuario no registrado" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res.status(400).json({ message: "contraseña no valida" });
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});

//GET /api/auth/verify
router.get("/verify", isTokenValid, (req, res, next) => {
  res.json(req.payload);
});

module.exports = router;
