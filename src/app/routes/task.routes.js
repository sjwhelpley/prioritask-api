module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Task
    router.post("/", tasks.create);

    // Retrieve all Tasks due today
    router.get("/today", tasks.findDueToday);

    // Retrieve all Tasks due upcoming
    router.get("/upcoming", tasks.findDueUpcoming);

    // Retrieve all Tasks uncomplete
    router.get("/uncomplete", tasks.findUncomplete);
  
    // Retrieve all Tasks
    router.get("/", tasks.findAll);
  
    // Retrieve a single Task with id
    router.get("/:id", tasks.findOne);
  
    // Update a Task with id
    router.put("/:id", tasks.update);
  
    // Delete a Task with id
    router.delete("/:id", tasks.delete);
  
    // Delete all Tasks
    router.delete("/", tasks.deleteAll);
  
    app.use('/.netlify/functions/api/tasks', router);
  };