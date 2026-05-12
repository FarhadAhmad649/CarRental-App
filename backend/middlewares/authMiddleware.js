import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    const token = authorization.split(" ")[1]; // Gets the 'token' from 'Bearer token'
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the ID and role to the request object for role checks
    req.user = {
      id: token_decode.id,
      role: token_decode.role,
    };
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
