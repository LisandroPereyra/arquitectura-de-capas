import express from "express";
import cookieParser from 'cookie-parser'
import handlebars from "express-handlebars";
import passport from 'passport'


import ApiRouter from "./src/routes/ApiRouters/index.js"
import ViewsRouter from "./src/routes/ApiRouters/index.js"

import dbConnection from "./src/config/connectionDB.js";
import initPassport from './src/config/passport.config.js'

import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dbConnection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser())

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

initPassport()  

app.use(passport.initialize())
app.use(passport.session())


app.use("/api", ApiRouter)
app.use("/", ViewsRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message })
})

export default app