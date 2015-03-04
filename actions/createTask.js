var TasksContants = require('../constants/tasks');

/**
 * Creates a task and emits all events regarding its creation
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
function createTask(app, payload, callback) {
    var task = app.getStore('TasksStore').createTask(payload);

    app.emit(TasksContants.CREATE_START, task);

    app.getService('TasksService').create(task, function(error, created) {
        if (error) {
            app.emit(TasksContants.CREATE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.CREATE_SUCCESS, created.id);
        callback && callback(null, created);
    });
}

module.exports = createTask;