const mongoose = require(`mongoose`);

const connectdb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    } catch(err) {
        console.error(err);
    }
};

module.exports = connectdb;