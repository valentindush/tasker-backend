const { AddTask } = require('../controllers/taskController');
const router = require('express').Router();

router.post('/addtask', AddTask)

module.exports.tasksRouter = router;