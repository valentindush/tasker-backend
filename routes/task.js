const { AddTask, UpdateTask, GetTasks } = require('../controllers/taskController');
const router = require('express').Router();

router.post('/addtask', AddTask)
router.put('/updatetask', UpdateTask)
router.get('/gettasks', GetTasks)

module.exports.tasksRouter = router;