const express = require('express');

require('dotenv').config();

const mongoSanitize = require('express-mongo-sanitize');
const { apiLimiter, authLimiter } = require("./middlewares/rateLimit.middleware");
const { securityMiddleware } = require("./middlewares/security.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
// const restaurantRoutes = require("./routes/restaurant.routes");
// const foodRoutes = require("./routes/food.routes");
// const cartRoutes = require("./routes/cart.routes");
// const orderRoutes = require("./routes/order.routes");
// const reviewRoutes = require("./routes/review.routes");
// const searchRoutes = require("./routes/search.routes");

const app = express();

app.use(express.json());
securityMiddleware.forEach(m => app.use(m));
// app.use((req, res, next) => {
//   // ⚠️ Skip sanitize for SSR requests
//   if (req.originalUrl.startsWith('/api')) {
//     return mongoSanitize()(req, res, next);
//   }
//   next();
// });
app.use(loggerMiddleware);

app.use("", apiLimiter);
app.use("/v1/auth", authLimiter, authRoutes);
app.use('/v1/users', authLimiter, userRoutes);
// app.use("/v1/restaurants", restaurantRoutes);
// app.use("/v1/foods", foodRoutes);
// app.use("/v1/cart", cartRoutes);
// app.use("/v1/orders", orderRoutes);
// app.use("/v1/reviews", reviewRoutes);
// app.use("/v1/search", searchRoutes);

module.exports = app;