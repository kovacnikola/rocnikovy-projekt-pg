const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const Sequelize = require('sequelize');

const db = require('./models/index');
db.sequelize
    .authenticate()
    .then(() => console.log('DATABASE CONNECTED'))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());

const userRoute = require('./routes/user');
app.use('/users', userRoute);
const snippetRoute = require('./routes/snippet');
app.use('/snippets', snippetRoute);
const commentRoute = require('./routes/comment');
app.use('/comments', commentRoute);

const SERVER_PORT = process.env.PORT;
app.listen(SERVER_PORT, () => console.log(`LISTENING ON PORT ${SERVER_PORT}!`));
