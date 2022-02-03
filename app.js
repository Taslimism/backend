const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
const users = require('./router/user-router');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));

(async () => {
    const DB_URL = process.env.DB_URL.replace('<DB_PASSWORD>', process.env.DB_PASSWORD).replace('<DB_USER>', process.env.DB_USER).replace('<DB_NAME>', process.env.DB_NAME);
    console.log(DB_URL)
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