var TasksContants = require('../constants/tasks');

module.exports = function(app, payload, callback) {
    app.emit(TasksContants.RETRIEVE_START, payload);

    app.getService('TasksService').read(null, function(error, tasks) {
        if (error) {
            app.emit(TasksContants.RETRIEVE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.RETRIEVE_SUCCESS, tasks);
        callback && callback(null, tasks);
    });
};

module.exports.name = 'show-tasks';