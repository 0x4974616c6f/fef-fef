const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  category: { type: String, required: true },
});

const modelName = "Money";

module.exports =
  mongoose.models[modelName] || mongoose.model(modelName, moneySchema);