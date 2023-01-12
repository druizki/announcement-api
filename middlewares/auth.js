const jwt = require("jsonwebtoken");

module.exports = {
  getUser: (token) => {
    try {
      if (token) {
        return jwt.verify(token, process.env.SECRET);
      }
      return null;
    } catch (error) {
      return null;
    }
  },
};
