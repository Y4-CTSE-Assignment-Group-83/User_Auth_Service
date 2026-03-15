import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/* ===========================
   VERIFY TOKEN
=========================== */

export const verifyToken = async (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    let token = null;

    // 1️⃣ Try cookie token (main method)
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 2️⃣ Fallback to Authorization header
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

    // Verify token signature
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from database
    const user = await User.findById(decoded.userId).select(
      "_id role isActive passwordChangedAt",
    );

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Account is deactivated",
      });
    }

    // Check if password was changed after token was issued
    if (user.passwordChangedAt) {
      const passwordChangedTimestamp = Math.floor(
        new Date(user.passwordChangedAt).getTime() / 1000,
      );

      if (decoded.iat < passwordChangedTimestamp) {
        return res.status(401).json({
          message: "Session expired. Please login again.",
        });
      }
    }

    // Attach safe user data to request
    req.user = {
      userId: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

/* ===========================
   CUSTOMER ONLY
=========================== */

export const requireCustomer = (req, res, next) => {
  if (!req.user || req.user.role !== "CUSTOMER") {
    return res.status(403).json({
      message: "Customer access required",
    });
  }

  next();
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
