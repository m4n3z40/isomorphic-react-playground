var _ = require('lodash'),
    router = require('express').Router(),
    tasksCount = 0,
    tasks = [];

/**
 * Return next task ID
 *
 * @return {string}
 */
function nextId() {
    return 'tsk_' + ++tasksCount;
}

/**
 * Creates a new task and returns it
 *
 * @param {string} text
 * @return {Object}
 */
function createTask(text) {
    var newTask = {id: nextId(), text: text, completed: false};

    tasks.push(newTask);

    return newTask;
}

/**
 * Updates a task and returns it
 *
 * @param {string} id
 * @param {Object} data
 * @return {*|Object}
 */
function updateTask(id, data) {
    var task = _.find(tasks, {id: id});

    delete data['editing'];

    if (task) {
        _.assign(task, data);

        task.completed = !(!task.completed || task == 'false');
    }

    return task;
}

/**
 * Deletes a task and returns it
 *
 * @param {string} id
 * @return {Object|*}
 */
function deleteTask(id) {
    return _.remove(tasks, {id: id})[0];
}

//Initial data
createTask('Do groceries.');
createTask('Do dishes.');
createTask('Go running.');

//Configuring simple logger
router.use(function(req, res, next) {
    console.log('TODOS API REQUEST: %s %s', req.method, req.path);
    next();
});

router.route('/tasks')
    .get(function(req, res) {
        res.json({
            code: 200,
            message: 'Tasks list retrieved successfully',
            content: tasks
        });
    })
    .post(function(req, res) {
        var newTask = createTask(req.body.text);

        res.json({
            code: 200,
            message: 'Task created successfully',
            content: newTask
        });
    });

router.route('/tasks/:id')
    .get(function(req, res) {
        var task = _.find(tasks, {id: req.params.id});

        if (!task) {
            res.json({
                code: 404,
                message: 'task not found',
                content: null
            });
        }

        res.json({
            code: 200,
            message: 'Task found',
            content: task
        });
    })
    .put(function(req, res) {
        var task = updateTask(req.params.id, req.body);

        if (!task) {
            res.json({
                code: 404,
                message: 'task not found',
                content: null
            });
        }

        res.json({
            code: 200,
            message: 'Task updated',
            content: task
        });
    })
    .delete(function(req, res) {
        var task = deleteTask(req.params.id);

        if (!task) {
            res.json({
                code: 404,
                message: 'task not found',
                content: null
            });
        }

        res.json({
            code: 200,
            message: 'Task deleted',
            content: task
        });
    });

module.exports = router;