const e = require("express");
const db = require("../models");

const Tutorial = db.tutorials;

exports.create = (req, res) => {
  const { title, description, published } = req.body;
  const tutorial = {
    title,
    description,
    published: published ? published : false,
  };
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while create.`,
      });
    });
};

exports.findAll = (req, res) => {
  Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Receive error.`,
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.query;
  let presentId = req.query.hasOwnProperty("id");
  if (id) {
    Tutorial.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error getting one record.`,
        });
      });
  } else {
    res.send("id not found");
  }
};

exports.updateTitle = (req, res) => {
  const body = req.body;
  const { id, title, description, published } = req.body;

  const sort = req.query.sort;
  let checkSort = req.query.hasOwnProperty("sort");

  if (body) {
    Tutorial.update({ title, description, published }, { where: { id } })
      .then((data) => {
        Tutorial.findAll({ order: [["id"]] })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || `Error getting task.`,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error getting  all task.`,
        });
      });
  } else {
    res.send("to update you need to get all the data");
  }
};

exports.findAllTitle = (req, res) => {
  const title = req.query.title;
  let presentTitle = req.query.hasOwnProperty("title");

  if (presentTitle) {
    Tutorial.findAll({ where: { title } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tutorials.`,
        });
      });
  } else {
    res.send("title not found");
  }
};

exports.remove = (req, res) => {
  const { id } = req.query;

  let present = req.query.hasOwnProperty("id");
  if (present) {
    Tutorial.destroy({ where: { id: id } }).then((data) => {
      Tutorial.findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `Error while deleting record.`,
          });
        });
    });
  } else {
    res.status(500).send("deletion is not possible");
  }
};
