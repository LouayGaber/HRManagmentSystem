module.exports = (app) => {
  const companyUser = require("../controller/companyUser.controller");
  var router = require("express").Router();

  router.post("/create", companyUser.create);
  router.post("/login", companyUser.login);
  router.get("/user/:id", companyUser.findOne);
  router.put("/user/:id", companyUser.update);
  router.put("/worker/:id", companyUser.updateWorker);
  router.post("/addworker", companyUser.addWorker);
  router.delete("/delete/:userid/:id", companyUser.deleteWorker);

  app.use("/api", router);
};
