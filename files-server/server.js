const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const cors = require("cors");
const upload = require("./controllers/upload");
const fetchToken = require("./middlewares/fetchToken");

const app = express();
const port = process.env.PORT || 8000;

const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://expenso-jet.vercel.app";
console.log("FRONTEND_URL: ",FRONTEND_URL);

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'uploads')))

app.post("/api/upload", fetchToken, upload);

app.listen(port, ()=> {
    console.log(`Server started successfully at port ${port}.`);
});