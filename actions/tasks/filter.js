var TasksContants = require('../../constants/tasks');

/**
 * Emits a filter action
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
var filterTasks = module.exports = function(app, payload, callback) {
    app.emit(TasksContants.FILTER, payload);
};

filterTasks.identifier = 'filterTasks';