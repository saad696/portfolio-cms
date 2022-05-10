const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// variables
const app = express();
const MONGODB_URI = `mongodb+srv://saad:SJmXwC5xQwCVeAPB@cluster0.lno7f.mongodb.net/portfolio-cms?retryWrites=true&w=majority`;

// routes imports
const adminCmsRoutes = require('./routes/admin-cms');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/admin-cms', adminCmsRoutes);

app.use('/', (req, res, next) => {
    res.status(200).json({ message: 'Hello from admin backend!' });
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});

// database connection
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
