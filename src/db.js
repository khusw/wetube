import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL_PRODUCTION, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB !");
const handleError = error => console.log(`Fail to connected to DB : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
