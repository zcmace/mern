import {apolloServer} from "./src/config/apolloServerConfig.js"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

// const MONGODB_URL = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo:${process.env.MONGODB_PORT}/people`
const MONGODB_URL = "mongodb://root:example@localhost:27017"

await mongoose.connect(MONGODB_URL, {useNewUrlParser: true, dbName: "test-db"});



apolloServer.listen().then(({url}) => console.log(`Server Started on ${url}`));