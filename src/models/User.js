const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const modelName = 'User';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, userSchema);
}