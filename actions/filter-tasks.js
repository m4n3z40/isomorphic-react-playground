var TasksContants = require('../constants/tasks');

module.exports = function(app, payload, callback) {
    app.emit(TasksContants.FILTER, payload);
};

module.exports.name = 'filter-tasks';