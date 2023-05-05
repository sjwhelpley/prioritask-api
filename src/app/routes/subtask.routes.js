module.exports = app => {
    const subtasks = require("../controllers/subtask.controller.js");
  
    var router = require("express").Router();
  
    // Create a new SubTask
    router.post("/", subtasks.create);
  
    // Retrieve all SubTasks with specific Task id
    router.get("/", subtasks.findAll);
  
    // Retrieve a single SubTask with id
    router.get("/:id", subtasks.findOne);
  
    // Update a SubTask with id
    router.put("/:id", subtasks.update);
  
    // Delete a SubTask with id
    router.delete("/:id", subtasks.delete);
  
    // Delete all SubTasks
    router.delete("/", subtasks.deleteAll);
  
    app.use('/.netlify/functions/api/subtasks', router);
  };