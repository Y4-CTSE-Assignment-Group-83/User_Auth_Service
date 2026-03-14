import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/* ===========================
   VERIFY TOKEN
=========================== */

export const verifyToken = (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    let token = null;

    // 1️⃣ Try cookie token (main method)
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 2️⃣ Fallback to Authorization header (useful for Postman)
    if (!token) {
      const authHeader = req.headers.authorization || "";
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded payload to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

/* ===========================
   ADMIN ONLY
=========================== */

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};

/* ===========================
   STAFF ONLY
=========================== */

export const requireStaff = (req, res, next) => {
  if (!req.user || req.user.role !== "STAFF") {
    return res.status(403).json({
      message: "Staff access required",
    });
  }

  next();
};

/* ===========================
   ADMIN OR STAFF
=========================== */

export const requireStaffOrAdmin = (req, res, next) => {
  if (!req.user || !["ADMIN", "STAFF"].includes(req.user.role)) {
    return res.status(403).json({
      message: "Staff or Admin access required",
    });
  }

  next();
};
