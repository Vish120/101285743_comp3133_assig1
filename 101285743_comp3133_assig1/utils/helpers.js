const jwt = require("jsonwebtoken");

const getUser = (token) => {
  if (token) {
    try {
      const secrete = process.env.JWTSECRET;
      // get user information from the token
      return jwt.verify(token, secrete);
    } catch (err) {
      return { error: true, msg: "Session invalid" };
    }
  }
};
function validatePostalCode(value) {
  const postalRegex = /^\d{5}-\d{4}$/gm;
  return postalRegex.test(value);
}
function validateEmail(value) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
}
function validateDate(value) {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(value);
}
function verifyParams(args) {
  let params = {};
  const keys = Object.keys(args);
  keys.forEach((item) => {
    if (item === "listing_title" || "postal_code" || "city") {
      if (item === "postal_code" || "city") {
        if (item === "postal_code") {
          !params["city"] && (params[item] = args[item]);
        } else {
          !params["postal_code"] && (params[item] = args[item]);
        }
      } else {
        params[item] = args[item];
      }
    } else {
      throw new Error(
        "Sorry, only listing_title and  postal_code/city are permited for this search"
      );
    }
  });
  return params;
}
module.exports = {
  getUser,
  validatePostalCode,
  validateEmail,
  validateDate,
  verifyParams,
};
