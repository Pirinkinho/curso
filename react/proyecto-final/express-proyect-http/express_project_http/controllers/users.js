const { hashPassword } = require("../helpers/auth");
const usersRepository = require("../repositories/users");
const teachersRepository = require("../repositories/teachers");
const getAll = (req, res) => {
  usersRepository.getAll().then((results) => res.json(results));
};
const getById = (req, res) => {
  usersRepository
    .getById(req.params.id)
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
};

const create = async (req, res) => {
  const registered = await usersRepository.getByEmail(req.body.email);
  if (registered != null) {
    return res.status(422).json({ message: "This email is in use." });
  }
  const pass = await hashPassword(req.body.password);
  const data = {
    email: req.body.email,
    password: pass,
    active: req.body.active,
  };
  usersRepository
    .create(data)
    .then((result) => {
      res.json({ success: true, message: "User was saved successfully" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const update = async (req, res) => {
  const results = await usersRepository.getById(req.params.id);
  if (results == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  const register = await usersRepository.getByEmail(req.body.email);
  if (register != null && register.id != req.params.id) {
    return res.status(422).json({ message: "This email is in use." });
  }
  const pass = await hashPassword(req.body.password);
  const data = {
    email: req.body.email,
    password: pass,
    active: req.body.active,
  };
  usersRepository
    .update(req.params.id, data)
    .then((result) => {
      res.json({ success: true, message: "User was updated successfully" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const remove = async (req, res) => {
  const user = await usersRepository.getById(req.params.id);
  if (user == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  const teacher = await teachersRepository.getByUserId(user.id);
  if (teacher != null) {
    return res
      .status(422)
      .json({ message: "The user has an associated teacher" });
  } else {
    usersRepository
      .remove(user.id)
      .then((result) => {
        res.json({ success: true, message: "User was removed successfully" });
      })
      .catch((err) => {
        res.json({ success: false, message: err.message });
      });
  }
};

const getActive = async (req, res) => {
  const user = await usersRepository.getById(req.params.id);
  if (user == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  res.json(user.active);
};
const updateActive = async (req, res) => {
  let user = await usersRepository.getById(req.params.id);

  if (user == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  usersRepository
    .update(req.params.id, {
      active: true,
    })
    .then(async (result) => {
      user = await usersRepository.getById(req.params.id);
      res.json(user);
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const getUsers = async (req, res) => {
  const users = await usersRepository.getAll();
  console.log(users);
  res.render("users", {
    users,
  });
};

const signUp = async (req, res) => {
  const registeredU = await usersRepository.getByEmail(req.body.email);
  if (registeredU != null) {
    return res.status(422).json({ message: "This email is in use." });
  }  
  const registeredT = await teachersRepository.getByDni(req.body.dni);
  if (registeredT != null) {
    return res.status(422).json({ message: "This dni is in use." });
  }
  let user;
  try {
    const pass = await hashPassword(req.body.password);
    const dataU = {
      email: req.body.email,
      password: pass,
      type: "teacher"
    };
    user = await usersRepository.create(dataU);  
  } catch (err) {
    return res.json({ success: false, message: err.message });
  };
  let teacher;
  try {
    const data = {
      dni: req.body.dni,
      name: req.body.name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      user_id: user.id,
    };
    teacher = teachersRepository.create(data);
  } catch (err) {
    if (user) {
      await usersRepository.remove(user.id);
    }
    return res.json({ success: false, message: err.message });
  }
  if (user && teacher) {
    let newUser = user.toJSON();
    delete newUser.password;
    return res.json(newUser);
  } else {
    return res.json({ success: false, message: "The records can't be created. Try it later." });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getActive,
  updateActive,
  getUsers,
  signUp,
};
