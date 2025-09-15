// load the routes
app.use('/', require('./server/routes/routes'));

// 404 handler (page not found)
app.use((req, res, next) => {
    res.status(404).render('error', { message: "Page not found" });
});

// Global error handler (catch server crashes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: "Internal Server Error" });
});
