var TasksContants = require('../../constants/tasks');

/**
 * Emits a filter action
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
module.exports = function filterTasks(app, payload, callback) {
    app.emit(TasksContants.FILTER, payload);
};