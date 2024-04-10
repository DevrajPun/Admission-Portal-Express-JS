const e = require("express");
// console.log(e)

// access the method of express and store into app variable
const app = e();
const port = 4000;
const web = require("./routes/web");
const connectDb = require("./db/connectDB");
const bodyParser = require("body-parser");
// Get Token
const cookieparser = require("cookie-parser")

// Get Token
app.use(cookieparser())
// connect flash and sessions
const session = require("express-session");
const flash = require("connect-flash");

// image upload
const fileUpload = require("express-fileupload");
// tempfiles uploads
app.use(fileUpload({useTempFiles: true}));
// messages
app.use(
  session({
    secret: "secret",
    cookie: {maxAge: 6000},
    resave: false,
    saveUninitialized: false,
  })
);
// flash Messages
app.use(flash());

// connectDB
connectDb();

// Get Data
// parse application/x-wwww-form-urlencoded
app.use(e.urlencoded({extended: false}));

// EJS (Embedded JavaScript Template)
app.set("view engine", "ejs");

// image css link
app.use(e.static("public"));

//route load
app.use("/", web);

// server create
app.listen(port, () => {
  console.log(`server start localhost: ${port}`);
});
