const db = require("../models");
const companyUsers = db.companyUsers;
const workers = db.workers;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  // Save user in the database
  companyUsers
    .create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  companyUsers
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  companyUsers
    .update(req.body, { where: { id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.login = (req, res) => {
  companyUsers
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = req.body.password == user.password;

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      workers
        .findAll({
          where: {
            userId: req.body.username,
          },
        })
        .then((workers) => {
          res.status(200).send({
            id: user.id,
            username: user.username,
            workers,
            accessToken: token,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.deleteWorker = async (req, res) => {
  const id = req.params.id;
  const userid = req.params.userid;
  let worker = await workers.findOne({ where: { id } }).catch((e) => {
    console.log(e.message);
  });
  if (!worker) {
    res.status(500).send({ error: "cant find worker with id ", id });
  } else {
    await worker.destroy();
    workers
      .findAll({
        where: {
          userid: userid,
        },
      })
      .then((workers) => {
        res.status(200).send({
          workers,
          message: "success",
        });
      });
  }
};
exports.updateWorker = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  workers
    .update(req.body.data)
    .then((data) => {
      res.send({ data, error: false });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
exports.addWorker = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  workers
    .create(req.body.data, { where: { id } })
    .then((data) => {
      res.send({ data, error: false });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
