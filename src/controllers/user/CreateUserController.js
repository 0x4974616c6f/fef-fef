const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const log = require("../../utils/log");

module.exports = {
  async create(req, res) {
    await body("name").notEmpty().run(req);
    await body("email").notEmpty().isEmail().run(req);
    await body("password").notEmpty().isStrongPassword().run(req);

    // Pelo menos 8 caracteres de comprimento
    // Pelo menos 1 letra maiúscula
    // Pelo menos 1 letra minúscula
    // Pelo menos 1 número
    // Pelo menos 1 caractere especial

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      log(errors, "validation-errors.log");
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHash });
    return res.json(user);
  },
};
