const { comparePasswords, genToken } = require("../helpers/auth");
const teachersRepository = require("../repositories/teachers");

const home = async (req, res) => {
  if (req.user && req.user.type == "admin") {
    return res.redirect("/users");
  }
  const teacher = await teachersRepository.getByUserId(req.user.id);
  res.render("home", {
    user: req.user,
    teacher: teacher
  })
};

module.exports = {
  home
};
