import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace(/Bearer\s?/, "");
  console.log(token);
  try {
    const decode = jwt.verify(token, process.env.SC);
    req.userId = decode._id;
    next();

    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Access Denied" });
  }
};
