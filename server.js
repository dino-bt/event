//this is my server where all the back end links to.
//I am creating an express with require.
//I am requiring mongoose.
//I am using cors to have good connecticity with the front end.
//I am bringing in the controller from a seperate file and assigning it a variable

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

console.log(dotenv.parsed);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
//we set the origin of cors to our local host 3000 so we can connect the front end to the server
//we need to set up the credentials so that we can get the cookie in the front end because it doesnt allow it to be transfered
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//here is where I am connecting mongoose to my uri
//const mongooseConnect = process.env.MONGOOSE_CONNECT
//check the .env folder I put the uri there if you have any doubts just stick it in here
//after mongoose connect
mongoose.connect(
  process.env.MONGOOSE_URI,
  

  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
     useFindAndModify: false,
  }
);

mongoose.connection.on("connected",() =>{
  console.log("mongoose is connected")
}
)

//Here we create the route paths they are the final link to the the front end whre we will send response and get requests

//----------Register & Login -------------------

const user = require("./controller/user.controller");

app.post("/auth/", user.create);
app.post("/auth/login", user.createLogin);
app.get("/auth/logout", user.logout);
app.get("/auth/loggedin", user.loggedin);

//-------------Event Display-------------

const eventDisplay = require("./controller/eventDisplay.controller");

app.post("/eventdisplaypost/", auth, eventDisplay.eventDisplayPost);
app.get("/eventdisplaypost/list/", auth, eventDisplay.eventDisplayGet);
app.delete(
  "/eventdisplaypost/delete/:id",
  auth,
  eventDisplay.deleteEventDisplay
);
app.put("/eventdisplaypost/update/:id", auth, eventDisplay.updateEventDisplay);

//--------------My Port------------\\

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static("event-display/build"))
}
