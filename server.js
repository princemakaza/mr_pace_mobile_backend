const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require('./routers/user_router');
const profileRouter = require('./routers/profile_router');
const raceRouter = require('./routers/race_router');
const registerRouter = require('./routers/registration_router'); // Import the registration router
const eventBookingRouter = require('./routers/event_booking_router'); // Import the registration router
const productRouter = require('./routers/product_router'); // Import the registration router
const sportsNewsRouter = require('./routers/sports_news_router'); // Import the registration router
const orderProductRouter = require('./routers/order_product_router'); // Import the registration router
const membershipRouter = require('./routers/membership_router'); // Import the registration router
const training_program_Router = require('./routers/training_program_router'); // Import the registration router
const raceExperienceRouter = require('./routers/race_experience_router'); // Import the registration router
const trainingProgramPackageRouter = require('./routers/training_program_package_router'); // Import the registration router
const training_packages_bought = require('./routers/training_package_bought_router'); // Import the training package bought router
const injurySolutionRouter = require("./routers/injury_exercise_solution_router");
const injurySolutionPurchaseRouter = require("./routers/injury_solution_purchase_router");
const coachingCourseRouter = require("./routers/coaching_course_router");
const courseBookingRouter = require("./routers/course_booking_router");

const setupSwagger = require('./middlewares/swagger'); // Add Swagger setup

// Load environment variables
dotenv.config();
// training_packages_bought
// Database connection
mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to the database:", err));

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/v1/user_route", userRouter); // Keeping your existing route path
app.use("/api/v1/profile_route", profileRouter); // Keeping your existing route path
app.use("/api/v1/races", raceRouter); // Keeping your existing route path
app.use("/api/v1/register", registerRouter); // Registration routes
app.use("/api/v1/event_booking_route", eventBookingRouter); // Registration routes
app.use("/api/v1/event_booking_route", eventBookingRouter); // Registration routes
app.use("/api/v1/product_route", productRouter); // Registration routes
app.use("/api/v1/sports_news_route", sportsNewsRouter); // Registration routes
app.use("/api/v1/order_product_route", orderProductRouter); // Registration routes
app.use("/api/v1/membership_route", membershipRouter); // Registration routes
app.use("/api/v1/training_programs", training_program_Router); // Registration routes
app.use("/api/v1/race_experiences", raceExperienceRouter); // Registration routes
app.use("/api/v1/training_program_packages", trainingProgramPackageRouter); // Registration routes
app.use("/api/v1/training_packages_bought", training_packages_bought); // Registration routes
app.use("/api/v1/injury_solutions", injurySolutionRouter); // Injury solutions routes
app.use("/api/v1/injury_solution_purchases", injurySolutionPurchaseRouter); // Injury solution purchases routes
app.use("/api/v1/coaching_courses", coachingCourseRouter); // Coaching courses routes
app.use("/api/v1/course_bookings", courseBookingRouter); // Course bookings routes
// Alternatively, you could use: app.use('/api/users', userRouter);

// Setup Swagger documentation
setupSwagger(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});