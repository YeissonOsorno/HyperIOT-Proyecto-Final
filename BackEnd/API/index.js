'use strict';
/* From this file create connection that databse in MongoDB*/

const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;
const connectionString = 'mongodb://localhost:27017/hyperiot_db'
mongoose.Promise = global.Promise;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log( `Welcome , The connection with database was established in ${connectionString}`);
        app.listen(port, () => console.log(`Server in NodeJS runnig and listening in port: ${port}`));
    })
    .catch(error => console.log(error));