const { AddTask, UpdateTask, GetTasks, deleteTask } = require('../controllers/taskController');
const router = require('express').Router();

router.post('/addtask', AddTask)
router.put('/updatetask', UpdateTask)
router.get('/gettasks', GetTasks)
router.delete('/deletetask/:id',deleteTask)

module.exports.tasksRouter = router;