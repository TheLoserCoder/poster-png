const mongoose = require('mongoose');
const { module } = require('./scheme/user');

const dbPassword = "22edepadL";
const dbName = "poster-png"

 mongoose.connect(`mongodb+srv://chatoskeadmin:${dbPassword}@poster-png.qsryy.mongodb.net/${dbName}?retryWrites=true&w=majority`);

module.exports = mongoose.connection;