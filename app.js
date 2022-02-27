const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const createError = require("http-errors");
const cookieParser = require("cookie-parser")
const log = require("./utils/logger");

// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = express();

// Set up the express app
// Log requests to the console.
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
     message: 'Welcome to the beginning of nothingness.',
}));
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const usersRouter = require('./router/users');
const productsRouter = require('./router/products')
const ordersRouter = require('./router/orders')

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter)


const server = http.createServer(app);
server.listen(port, ()=>{
     console.log('server on port', port)
});

 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
     next(createError(404));
   });
   
   // error handler
   app.use((err, req, res, next) => {
     const code = err.code || 500;
   
     log.error(
       `${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
     );
     log.error(err.stack);
   
     const body = {
       error: {
         code,
         message: "There was an error, please try again later",
         detail: err.data,
       },
     };
     res.status(code).json(body);
   });
   
   app.use(function (err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get("env") === "development" ? err : {};
   
     // render the error page
     res.status(err.status || 500);
     res.render("error");
   });

module.exports = app;