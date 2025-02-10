const { verifyToken } = require("../helpers/auth");

const isAuth = (req, res, next, redirect = false) => {
  if (req.session && req.session.isLogged) {
    req.user = req.session.user;
    return next();
  }
  if (!req.headers.authorization) {
    if (redirect) {
      return res.redirect("/login");
    }
    return res.status(401).json({
      message: "Authorization Header missing",
    });
  }
  let authorization = req.headers.authorization; // Bearer JWT_TOKEN
  let token = authorization.split(" ")[1]; // JWT_TOKEN
  let jwtData;
  try {
    jwtData = verifyToken(token);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid Token.",
    });
  }
  req.user = jwtData.user;
  next();
};

const isAuthRedirect = (req, res, next) => {
    return isAuth(req, res, next, true);
};

const isAdmin = (req, res, next) => {
    console.log(req.user);
  if (req.user && req.user.type == "admin") {
    return next();
  } else {
    return res.status(401).json({
      message: "User is not allowed!",
    });
  }
};

module.exports = {
  isAuth,
  isAuthRedirect,
  isAdmin,
};
