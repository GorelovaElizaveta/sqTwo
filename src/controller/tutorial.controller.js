const express = require("express");
const db = require("../models");

const Tutorial = db.tutorials;

// Создание
exports.create = (req, res) => {
  const { title, description, published } = req.body;
  if (!(title && description && published)) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

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

//получение всех
exports.findAll = (req, res) => {
  Tutorial.findAll({ order: ["id"] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send( "tasks not defined");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Receive error.`,
      });
    });
};

//получение одной
exports.findOne = (req, res) => {
  const  id  = req.query.id;
console.log(id)

  if (id) {
    Tutorial.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(500).send("error task not found");
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error getting one record.`,
        });
      });
  } else {
    res.status(500).send( "id not found");
  }
};

// Изменение
exports.updateTitle = (req, res) => {
  const { id, title, description, published} = req.body;
  const body = req.body

  if (id && (title || description || published)) {
    Tutorial.update(body, { where: { id } })
      .then((data) => {
        Tutorial.findAll({ order: ["id"] })
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(500).send( "Error getting task.");
            }
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
    res.status(500).send( "to update you need to get all the data");
  }
};

//удаление
exports.remove = (req, res) => {
  const { id } = req.query;
  if(!id){
    res.status(500).send(" id not defaind");
  }

  if (present) {
    Tutorial.destroy({ where: { id } }).then((data) => {
      Tutorial.findAll({ order: ["id"] })
        .then((data) => {
          if (data) {
            res.send(data);
          } else {
            res.status(500).send("not defaind");
          }
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
