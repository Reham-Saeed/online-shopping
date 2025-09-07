const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const AppError = require("./utils/app-error.utils");
const globalErrorHandler = require("./middlewares/error-handler.middleware");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/user", require('./routes/user.route'));
app.use("/api/product", require('./routes/product.route'));
app.use("/api/category", require('./routes/category.route'));
app.use("/api/subcategory", require('./routes/subcategory.route'));
app.use("/api/testimonial", require('./routes/testimoial.route'));
app.use("/api/cart", require('./routes/cart.route'));
app.use("/api/order", require('./routes/order.route'));

app.use((req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`));
});
app.use(globalErrorHandler)
app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});


