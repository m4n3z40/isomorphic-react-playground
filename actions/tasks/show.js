var TasksContants = require('../../constants/tasks');

/**
 * Retrieves all tasks and emits all events regarding showing
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
var showTasks = module.exports = function(app, payload, callback) {
    app.emit(TasksContants.RETRIEVE_START, payload);

    app.getService('TasksService').read(payload, function(error, tasks) {
        if (error) {
            app.emit(TasksContants.RETRIEVE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.RETRIEVE_SUCCESS, tasks);
        callback && callback(null, tasks);
    });
};

showTasks.identifier = 'showTasks';