require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path'); // Importing the path module

// Static files configuration
app.use(express.static(path.join(__dirname, 'public')));

// CORS Configuration
/*const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'https://your-frontend-domain.com'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Origin', 'Content-Type', 'X-Auth-Token'],
  credentials: true, // Allow credentials
};*/
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', ''];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Origin', 'Content-Type', 'X-Auth-Token', 'Authorization'], // Ensure Authorization is here
  credentials: true, // Allow cookies & Authorization headers
  preflightContinue: false,
  optionsSuccessStatus: 204, // Ensures successful preflight response
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Import and use routes
const authRouter = require("./routes/authRoutes");
const hallRouter = require("./routes/hallRoutes");
const bookingRouter = require('./routes/bookingRoutes');
const { default: mongoose } = require('mongoose');
app.use(authRouter);
app.use(hallRouter);
app.use(bookingRouter);

//Health Check Route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Start Server
const start = async () => {
  try {
    //console.log("Database Connected");
    const url =process.env.MONGODB
    await mongoose.connect(url)
    console.log('Database connected')
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server Started at Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
