require('dotenv').config();
const mongoose = require("mongoose");
const {
  DB_PASSWORD, DB_NAME
} = process.env; 

const URI = 
  `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.stt8t.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
    