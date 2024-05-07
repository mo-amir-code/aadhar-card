const express = require("express");
const { connectToDB } = require("./services/connectToDb");
require("dotenv/config")
const cors  = require("cors");

const routers = require("./router");


const server = express();
connectToDB()

server.use(cors())
server.use(express.json())
server.use("/", routers)

server.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT} port....`);
})