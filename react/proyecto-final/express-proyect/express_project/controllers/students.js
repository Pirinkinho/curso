const studentsRepository = require("../repositories/students");
const teachersRepository = require("../repositories/teachers");

const getAll = (req, res) => {
  studentsRepository.getAll().then((results) => res.json(results));
};
const getById = (req, res) => {
  studentsRepository
    .getById(req.params.id)
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
};

const create = async (req, res) => {
  const data = {
    dni: req.body.dni,
    name: req.body.name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    teacher_id: req.body.teacher_id,
  };
  const teacher = await teachersRepository.getById(req.body.teacher_id);
  if (teacher == null) {
    return res.status(404).json({ message: "Teacher doesn't exist." });
  }
  studentsRepository
    .create(data)
    .then((result) => {
      res.json({ success: true, message: "Student was saved successfully" });
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
    teacher_id: req.body.teacher_id,
  };
  const student = await studentsRepository.getById(req.params.id);
  if (student == null) {
    return res.status(404).json({ message: "Student doesn't exist." });
  }
  const teacher = await teachersRepository.getById(req.body.teacher_id);
  if (teacher == null) {
    return res.status(404).json({ message: "Teacher doesn't exist." });
  }
  studentsRepository
    .update(req.params.id, data)
    .then((result) => {
      console.log(result);
      res.json({
        success: true,
        message: "Student was updated successfully",
      });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const remove = async (req, res) => {
  const student = await studentsRepository.getById(req.params.id);
  if (student == null) {
    return res.status(404).json({ message: "Student doesn't exist." });
  }
  studentsRepository
    .remove(student.id)
    .then((result) => {
      res.json({ success: true, message: "Student was removed successfully" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
