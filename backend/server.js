//built in node modules put at top
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
//
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
//import products from './data/products.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//port spec
const port = process.env.PORT || 5000;

//connect to DB
connectDB();

//initialize app
const app = express();

//body parser middleware
app.use(express.json()); //part of express now
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //allows to access request.cookies.<cookie_name>

/*
//base route
app.get('/', (req, res) => {
  res.send('API is running...');
});
*/

//bring in the routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes); //for product image upload

//paypal route
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
}
);

//prod , non-prod variation
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); //set __dirname to current directory
  app.use('/uploads', express.static('/var/data/uploads'));
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  // any route that is not defined api route will be redirected to 
  //frontend build folder >> index.html
  app.get('*', (req, res) =>
    // if we are in prod, points to the index.html file in the build folder of the
    // frontend dir
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else { //for non-prod
  const __dirname = path.resolve(); //set __dirname to current directory
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//use error handlers
app.use(notFound);
app.use(errorHandler);

//start server up
app.listen(port, () =>
  console.log(`Server running on port ${port}`.blue.underline)
);
