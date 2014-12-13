var TasksContants = require('../constants/tasks');

/**
 * Updates a task and emits all events regarding its update
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
function updateTask(app, payload, callback) {
    app.emit(TasksContants.UPDATE_START, payload);

    app.getService('TasksService').update(payload, function(error, updated) {
        if (error) {
            app.emit(TasksContants.UPDATE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.UPDATE_SUCCESS, updated);
        callback && callback(null, updated);
    });
}

module.exports = updateTask;