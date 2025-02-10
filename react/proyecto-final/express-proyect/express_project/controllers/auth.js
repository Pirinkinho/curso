const { comparePasswords, genToken } = require("../helpers/auth");
const usersRepository = require("../repositories/users");

const getLogin = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  const user = await usersRepository.getByEmail(req.body.username);
  if (!user) {
    return res.render("error", {
      originalUrl: req.originalUrl,
      withError: true,
      error: "Invalid username or password!!",
    });
  } else {
    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
      return res.render("error", {
        originalUrl: req.originalUrl,
        withError: true,
        error: "Invalid username or password!!",
      });
    }
    req.session.isLogged = true;
    req.session.user = {
      id: user.id,
      email: user.email,
      active: user.active,
      type: user.type,
    };
    res.redirect("/home");
  }
};

const logout = (req, res) => {
  delete req.session.isLogged;
  delete req.session.user;
  res.redirect("/login");
};

const getToken = async (req, res) => {
  const user = await usersRepository.getByEmail(req.body.username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password!!" });
  } else {
    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password!!" });
    }
    const loggedUser = {
      id: user.id,
      email: user.email,
      active: user.active,
      type: user.type,
    };
    const token = genToken({ user: loggedUser });
    return res.json({ token });
  }
};

module.exports = {
  getLogin,
  login,
  logout,
  getToken,
};
