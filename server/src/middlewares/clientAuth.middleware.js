import { verifyToken } from "../utils/clientTokenUtils.js";

export const clientAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.client = decoded; // attach client info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
