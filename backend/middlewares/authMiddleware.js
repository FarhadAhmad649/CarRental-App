import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
<<<<<<< HEAD
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
=======
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }

  let token = authHeader.split(" ")[1];
  if (token?.startsWith('"') && token?.endsWith('"')) {
    token = token.slice(1, -1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("Auth middleware error: JWT_SECRET is not configured");
    return res.status(500).json({ message: "Server configuration error" });
  }

>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
