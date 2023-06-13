import mongoose from "mongoose"; //import connect


const url = "mongodb+srv://lisandro:lisandro2003@cluster0.kbowbgi.mongodb.net/test"

const dbConnection = async () => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB conectado")
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbConnection