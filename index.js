const express = require('express')
const { google } = require('googleapis')
const fs = require('fs')
const apikeys = require('./apikey.json')
const SCOPE = ['https://www.googleapis.com/auth/drive'];
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { dbConnect } = require('./config/database');
const certificateRoutes = require('./routes/certificates');
const PORT = process.env.PORT || 4000
dotenv.config();


app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/api', certificateRoutes)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
})


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Server is running perfectly"
    })
})


dbConnect();
