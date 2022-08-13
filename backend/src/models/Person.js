import mongoose from "mongoose";
export const Person = mongoose.model("Person", {name: String, age: Number, address: String}, "people")
