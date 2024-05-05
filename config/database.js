const mongoose = require('mongoose')
require('dotenv').config()

exports.dbConnect = async () => {

    await mongoose.connect(process.env.DATABASE_URL, {
    })
        .then(() => console.log("Database connected"))
        .catch((error) => {
            console.log(error);
            console.log("Database not connected");
            process.exit(1);
        })

}