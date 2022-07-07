const { AddTask, UpdateTask } = require('../controllers/taskController');
const router = require('express').Router();

router.post('/addtask', AddTask)
router.put('/updatetask', UpdateTask)

module.exports.tasksRouter = router;