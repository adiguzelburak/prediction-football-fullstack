const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //mongodb connect
        const con = await mongoose.connect(process.env.MONGO_URL)

        console.log(`MONGODB CONNECTION OK! : ${con.connection.host}`)
    } catch (error) {
        console.log('error ==> ', error)
        process.exit(1)
    }
}

module.exports = connectDB;