// express validators middleware to check that data meets critera
import { body, validationResult } from "express-validator";

// body is a function that checks if the field on the body is valid
// normalize email changes email into a standard form

// validation chain and checks all these types of inputs
// returns a middleware function, for each validation it runs it through the req
// validation returns errors, if none that means passed
export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        // if there is an error, break right away
        break;
      }
    }
    const errors = validationResult(req);
    // move onto next errors
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

// gets the specified attribute from the body
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];

export const chatValidator = [
  body("message").notEmpty().withMessage("message is required"),
];
