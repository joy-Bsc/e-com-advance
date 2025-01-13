import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectToDb = async () => {
 const connectionUrl = "mongodb+srv://joy:gvVDrmKNiKSF3XQt@cluster0.thgjuqm.mongodb.net/nextjs-ecommerce";

 mongoose.connect(connectionUrl, configOptions)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log("Error connecting to database", error.message));
};

export default connectToDb;