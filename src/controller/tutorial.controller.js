const db = require("../models");

const Tutorial = db.tutorials;

exports.create = (req, res) => {
  const { title, description, published } = req.body;
  const tutorial = {
    title,
    description,
    published: published ? published : false,
  };
  Tutorial.create(tutorial).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || `Some error occurred while create.`,
    });
  });
};

exports.findAll = (req, res) => {
  Tutorial.findAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || `Receive error.`,
    });
  });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Tutorial.findByPk(id).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || `Error getting one record.`,
    });
  });
};

exports.updateTitle = (req, res) => {
  const { id } = req.params;
  const { title } = req.query;
  let presentTitle = req.query.hasOwnProperty("title");

  if (presentTitle) {
    Tutorial.update(
      { title: title },
      {
        where: { id: id },
      }
    ).then((data) => {
      Tutorial.findAll().then((data) => {
        res.send(data);
      });
    });
  } else {
    res.status(500).send("404 update not created");
  }
};

exports.findAllTitle = (req, res) => {
  const title = req.query.title;
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
};

exports.remove = (req, res) => {
  const { id } = req.query;

  let present = req.query.hasOwnProperty("id");
  if(present){
  Tutorial.destroy({ where: { id: id } }).then((data) => {
    Tutorial.findAll().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error while deleting record.`,
      });
    });;
  });
} else {
  res.status(500).send("deletion is not possible");
}
};
