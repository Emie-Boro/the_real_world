const mongoose = require('mongoose')

const connectDB = async function() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB Connected...')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB