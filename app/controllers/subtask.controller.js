const db = require("../models");
const SubTask = db.subtask;

// Create and Save a new SubTask
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a SubTask
    const subtask = new SubTask({
        taskId: req.body.taskId,
        title: req.body.title,
        completed: req.body.completed ? req.body.completed : false
    });

    // Save SubTask in the database
    subtask
        .save(subtask)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the SubTask."
            });
        });
};

// Retrieve all SubTasks from the database with taskId in query
exports.findAll = (req, res) => {
    const taskId = req.query.taskId;
    SubTask.find({ taskId: taskId })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred when retrieving tasks."
            });
        });
};

// Find a single SubTask with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SubTask.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found SubTask with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving SubTask with id=" + id });
        });
};


// Update a SubTask by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    SubTask.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update SubTask with id=${id}. Maybe SubTask was not found!`
                });
            } else res.send({ message: "SubTask was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating SubTask with id=" + id
            });
        });
};

// Delete a SubTask with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SubTask.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                message: `Cannot delete SubTask with id=${id}. Maybe SubTask was not found!`
                });
            } else {
                res.send({
                message: "SubTask was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete SubTask with id=" + id
            });
        });
};

// Delete all SubTasks from the database
exports.deleteAll = (req, res) => {
    SubTask.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} SubTasks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all SubTasks."
            });
        });
};