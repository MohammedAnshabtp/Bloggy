import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@bloggy.81ivtdl.mongodb.net/`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database connected succcessfully");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
};

export default Connection;
