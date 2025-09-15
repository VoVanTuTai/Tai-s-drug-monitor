const express = require('express'); // we installed express using npm previously
const app = express(); 
const bodyParser = require('body-parser'); // body-parser makes it easier to deal with request content
const dotenv = require('dotenv').config(); // indicates we would be using .env
const morgan = require('morgan'); // this logs requests so you can easily troubleshoot
const connectMongo = require('./server/database/connect'); // requires connect.js file
const PORT = process.env.PORT || 3100; // port config

// set view engine
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets')); // serve static files
app.use(morgan('tiny'));

// connect to Database
connectMongo(); 

// load the routes
app.use('/', require('./server/routes/routes'));

// ---------------------
// 404 handler (Page not found)
// ---------------------
app.use((req, res, next) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        message: `The page "${req.originalUrl}" does not exist.`
    });
});

// ---------------------
// Global error handler (500)
// ---------------------
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);

    // Nếu request là API thì trả về JSON
    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
        res.status(500).json({
            error: true,
            message: err.message || 'Something went wrong!'
        });
    } else {
        // render error.ejs cho web app
        res.status(500).render('error', {
            title: 'Error Page',
            message: err.message || 'Unexpected server error!'
        });
    }
});

// ---------------------
// Start server
// ---------------------
app.listen(PORT, function() {
    console.log('listening on ' + PORT);
    console.log(`Welcome to the Drug Monitor App at http://localhost:${PORT}`);
});
