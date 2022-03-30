module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller.js");
  const router = require("express").Router();

  router.post("/", tutorialControllers.create);
  router.get("/getAllTutorial", tutorialControllers.findAll);
  router.get("/getOne/:id", tutorialControllers.findOne);
  router.patch("/:id", tutorialControllers.updateTitle);
  router.delete("/", tutorialControllers.remove);
  router.get("/findAllTitle", tutorialControllers.findAllTitle);

  app.use("/api/tutorials", router);
};
