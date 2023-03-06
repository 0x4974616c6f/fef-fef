const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    user_id: String,
    user_name: String,
    created_at: Date,
    updated_at: Date,
})

const modelName = 'Task';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
}
else {
    module.exports = mongoose.model(modelName, taskSchema);
}