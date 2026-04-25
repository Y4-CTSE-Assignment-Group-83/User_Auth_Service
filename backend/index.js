import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

/* ===========================
   Database Connection
=========================== */
import { connectDB } from "./src/config/db.js";

/* ===========================
   Swagger Config
=========================== */
import swaggerSpec from "./src/config/swagger.js";

/* ===========================
   Import Routes
=========================== */
import authRoutes from "./src/routes/auth.routes.js";
import staffRoutes from "./src/routes/staff.routes.js";
import staffManagementRoutes from "./src/routes/staff_management.routes.js";
import customerRoutes from "./src/routes/customer.routes.js";
import customerManagementRoutes from "./src/routes/customer_management.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===========================
   MIDDLEWARES
=========================== */

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===========================
   HEALTH CHECK (GOOD PRACTICE)
=========================== */

app.get("/", (req, res) => {
  res.json({
    service: "Auth Service",
    status: "Running",
  });
});

/* ===========================
   SWAGGER DOCS
=========================== */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ===========================
   ROUTES
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/staff-management", staffManagementRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/customer-management", customerManagementRoutes);

/* ===========================
   START SERVER
=========================== */

connectDB()
  .then(() => {
    console.log("✅ Auth Service Database Connected!");

    app.listen(PORT, () => {
      console.log(`🚀 Auth Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });
