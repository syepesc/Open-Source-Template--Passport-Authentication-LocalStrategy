// third party packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
let path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');



// Initialize app with express
const app = express();



// DB Configuration
const DB = require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'DB Connection Error: '));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});



// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');



// Body parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './node_modules'))); // added to predetermine the path for libraries used inside node modules



// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));