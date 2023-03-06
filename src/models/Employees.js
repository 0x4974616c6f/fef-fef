const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    performanceEvaluations: { type: Number, required: true },
    dateOfAdmission: { type: Date, required: true },
    dateOfDismissal: { type: Date },
    reasonForTheDismissal: { type: String },
    photo: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const modelName = "Employee";

module.exports =
  mongoose.models[modelName] || mongoose.model(modelName, employeeSchema);
