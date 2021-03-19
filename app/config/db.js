const mongoose = require('mongoose');
const db = "mongodb+srv://rupu:rupu1234@cluster0.yrc5k.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, poolSize: 10});
module.exports = mongoose.connection;