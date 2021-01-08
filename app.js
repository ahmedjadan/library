if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const mongoose = require("mongoose");
const port = 3000;
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
    useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => console.log('connected to Mangoose'))

app.listen(process.env.PORT || port);
app.use("/", indexRouter);
