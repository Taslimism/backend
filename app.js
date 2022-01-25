const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;


dotenv.config();

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(express.json());
(async () => {
    const DB_URL = process.env.DB_URL.replace('<DB_PASSWORD>', process.env.DB_PASSWORD).replace('<DB_USER>', process.env.DB_USER).replace('<DB_NAME>', process.env.DB_NAME);
    const db = await mongoose.connect(DB_URL);
    if (db.error)
        console.log('ERROR CONNECTING TO DB: ' + db.error);
    else
        console.log('Connected to DB');
})();


app.use('/api/users', users);



app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})