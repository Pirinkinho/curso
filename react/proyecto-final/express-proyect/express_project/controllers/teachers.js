const teachersRepository = require("../repositories/teachers");
const usersRepository = require("../repositories/users");
const studentsRepository = require("../repositories/students");

const getAll = (req, res) => {
  teachersRepository.getAll().then((results) => res.json(results));
};
const getById = (req, res) => {
  teachersRepository
    .getById(req.params.id)
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
};

const getStudents = async (req, res) => {
  const teacher = await teachersRepository.getById(req.params.teacher_id);
  if (teacher == null) {
    return res.status(404).json({ message: "Teacher doesn't exist." });
  }
  const user = await usersRepository.getById(teacher.user_id);
  if (user == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  if (user.active != true) {
    return res.status(401).json({ message: "User not active" });
  }
  const students = await studentsRepository.getByTeacherId(teacher.id);

  res.json(students);
};

const create = async (req, res) => {
  const registered = await teachersRepository.getByDni(req.body.email);
  if (registered != null) {
    return res.status(422).json({ message: "This dni is in use." });
  }
  const user = await usersRepository.getById(req.body.user_id);
  if (user == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  const teacher = await teachersRepository.getByUserId(user.id);
  if (teacher != null) {
    return res
      .status(422)
      .json({ message: "This user_id is assigned to other teacher" });
  }
  const data = {
    dni: req.body.dni,
    name: req.body.name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    user_id: req.body.user_id,
  };
  teachersRepository
    .create(data)
    .then((result) => {
      res.json({ success: true, message: "Teacher was saved successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err.message });
    });
};

const update = async (req, res) => {
  const data = {
    dni: req.body.dni,
    name: req.body.name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    user_id: req.body.user_id,
  };
  const teacher = await teachersRepository.getById(req.params.id);
  if (teacher == null) {
    return res.status(404).json({ message: "Teacher doesn't exist." });
  }
  const user = await usersRepository.getById(req.body.user_id);
  if (user == null) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
  const teacherByUserId = await teachersRepository.getByUserId(user.id);
  if (teacherByUserId != null && teacherByUserId.id != teacher.id) {
    return res
      .status(422)
      .json({ message: "This user_id is assigned to other teacher" });
  }
  teachersRepository
    .update(req.params.id, data)
    .then((result) => {
      console.log(result);
      res.json({
        success: true,
        message: "Teacher was updated successfully",
      });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const remove = async (req, res) => {
  const teacher = await teachersRepository.getById(req.params.id);
  if (teacher == null) {
    return res.status(404).json({ message: "Teacher doesn't exist." });
  }
  const students = await studentsRepository.getByTeacherId(teacher.id);
  if (students.length > 0) {
    return res
      .status(422)
      .json({ message: "The teacher has associated students" });
  } else {
    teachersRepository
      .remove(teacher.id)
      .then((result) => {
        res.json({
          success: true,
          message: "Teacher was removed successfully",
        });
      })
      .catch((err) => {
        res.json({ success: false, message: err.message });
      });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getStudents,
};
