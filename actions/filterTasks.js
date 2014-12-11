var TasksContants = require('../constants/tasks');

function filterTasks(app, payload, callback) {
    app.emit(TasksContants.FILTER, payload);
}

module.exports = filterTasks;