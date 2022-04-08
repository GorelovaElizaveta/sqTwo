module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller.js");
  const router = require("express").Router();

  router.post("/", tutorialControllers.create);
  router.patch("/patch", tutorialControllers.updateTitle);
  router.delete("/", tutorialControllers.remove);
  router.get("/getAllTutorial", tutorialControllers.findAll);
  router.get("/getOne/", tutorialControllers.findOne);

  app.use("/api/tutorials", router);
};
