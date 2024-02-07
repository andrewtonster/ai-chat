import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (email, id, date) => {
  const payload = { email, id };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: date,
  });
  return token;
};

// verifying token when user access other resources
export const verifyToken = async (req, res, next) => {
  // retrieves cookies from incoming request
  const token = req.signedCookies[`${COOKIE_NAME}`];

  // checking if token exists
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not received" });
  }

  return new Promise((resolve, reject) => {
    // basically unhashing and verifying the token has not been changed
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token Verification successful");
        resolve();
        res.locals.jwtData = success; // setting a new property on locals called jwt to success
        // this also decodes the payload and allows the jwt data to be accessed by other middleware

        return next();
      }
    });
  });
};
