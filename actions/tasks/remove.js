var TasksContants = require('../../constants/tasks');

/**
 * Removes a task and Emits all events its removal
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
var removeTask = module.exports = function(app, payload, callback) {
    app.emit(TasksContants.DESTROY_START, payload);

    app.getService('TasksService').remove(payload, function(error, removed) {
        if (error) {
            app.emit(TasksContants.DESTROY_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.DESTROY_SUCCESS, removed);
        callback && callback(null, removed);
    });
};

removeTask.identifier = 'removeTask';