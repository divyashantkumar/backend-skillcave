//express-async-error lets the application throw error instead forcing to use next() function in async functions
import 'express-async-errors';
import boolParser from 'express-query-boolean';

import express from "express";
import logger from "./utils/logger.js"
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import helmet from "helmet";
import path from "path";
import cors from 'cors'
import cookieParser from "cookie-parser";

import { helmetOptions, morganOptions, rateLimitOptions, corsOptions } from './utils/middlewareOptions.js';

const app = express();


// Custom Morgan Format for logging requests and responses in the console 
const morganFormat = ":method :url :status :response-time ms";

// 1. Logging Middleware
app.use(morgan(morganFormat, morganOptions));


// 2. Application Security Middleware
app.use('/api', rateLimit(rateLimitOptions)); // Apply rate limiter only to API requests
app.use(helmet(helmetOptions));
app.use(hpp(helmetOptions));


// 3. CORS configuration
app.use(cors(corsOptions));


// 4. Body Parser Middleware
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(boolParser());
app.use(cookieParser())


// 5. Static Files Middleware
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static('public'));


// 6. Routes



// 7. Home Page Handler
app.use(RegExp('/$'), (req, res, next) => {
    res.status(200).send({
        status: "success",
        message: "Welcome to Skillcave API",
    })
});


// 8. Global Error Handlers  


// 9. 404 Global Path Handler
app.use((req, res, next) => {
    res.status(404);
    res.render('error404');
});


export default app;