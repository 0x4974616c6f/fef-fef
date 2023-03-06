const { body, validationResult, param } = require("express-validator");
const Employees = require("../../models/Employees");
const fs = require("fs");
const generateHashedFileName = require("../../utils/generateHashedFileName");

module.exports = {
  async employee_getAll(req, res) {
    try {
      const employees = await Employees.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async employee_getOne(req, res) {
    await param("id").notEmpty().isMongoId().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    try {
      const employee = await Employees.find({ _id: id });
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async employee_create(req, res) {
    await body("fullName").notEmpty().isString().run(req);
    await body("dateOfBirth").notEmpty().isString().run(req);
    await body("address").notEmpty().isString().run(req);
    await body("phone").notEmpty().isString().run(req);
    await body("email").notEmpty().isEmail().run(req);
    await body("position").notEmpty().isString().run(req);
    await body("salary").notEmpty().isNumeric().run(req);
    await body("performanceEvaluations").notEmpty().isNumeric().run(req);
    await body("dateOfAdmission").notEmpty().isString().run(req);
    await body("dateOfDismissal").optional().isString().run(req);
    await body("reasonForTheDismissal").optional().isString().run(req);
    await body("photo").optional().isString().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullName,
      dateOfBirth,
      address,
      phone,
      email,
      position,
      salary,
      performanceEvaluations,
      dateOfAdmission,
      dateOfDismissal,
      reasonForTheDismissal,
    } = req.body;

    let photo = req.body.photo;

    try {
      const userExist = await Employees.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "User already exists" });
      }

      const buffer = Buffer.from(
        photo.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      photo = `./public/upload/employees/${generateHashedFileName(photo)}`;

      fs.writeFile(photo, buffer, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        } else {
          console.log("Imagem salva com sucesso!");
        }
      });

      photo = photo.slice(2);

      const user = await Employees.create({
        fullName,
        dateOfBirth,
        address,
        phone,
        email,
        position,
        salary,
        performanceEvaluations,
        dateOfAdmission,
        dateOfDismissal,
        reasonForTheDismissal,
        photo,
      });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async employee_update(req, res) {
    await param("id").notEmpty().isMongoId().run(req);
    await body("fullName").notEmpty().isString().run(req);
    await body("dateOfBirth").notEmpty().isString().run(req);
    await body("address").notEmpty().isString().run(req);
    await body("phone").notEmpty().isString().run(req);
    await body("email").notEmpty().isEmail().run(req);
    await body("position").notEmpty().isString().run(req);
    await body("salary").notEmpty().isNumeric().run(req);
    await body("performanceEvaluations").notEmpty().isNumeric().run(req);
    await body("dateOfAdmission").notEmpty().isString().run(req);
    await body("dateOfDismissal").optional().isString().run(req);
    await body("reasonForTheDismissal").optional().isString().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullName,
      dateOfBirth,
      address,
      phone,
      email,
      position,
      salary,
      performanceEvaluations,
      dateOfAdmission,
      dateOfDismissal,
      reasonForTheDismissal,
    } = req.body;

    const { id } = req.params;

    let photo = req.body.photo;

    try {
      const userUpdate = await Employees.findOne({ _id: id });

      if (photo) {
        if (userUpdate.photo) {
          const path = `./${userUpdate.photo}`;
          fs.unlinkSync(path);
        }
        const buffer = Buffer.from(
          photo.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const path = `./public/upload/employees/${generateHashedFileName(
          photo
        )}`;
        fs.writeFile(path, buffer, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
          } else {
            console.log("Imagem salva com sucesso!");
          }
        });
        photo = path.slice(2);
      }

      const user = await Employees.updateOne(
        { _id: id },
        {
          fullName,
          dateOfBirth,
          address,
          phone,
          email,
          position,
          salary,
          performanceEvaluations,
          dateOfAdmission,
          dateOfDismissal,
          reasonForTheDismissal,
          photo,
        }
      );

      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async employee_delete(req, res) {
    await param("id").notEmpty().isMongoId().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      await Employees.deleteOne({ _id: id });
      res.json({ message: "Employee deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
