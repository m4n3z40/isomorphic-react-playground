var TasksContants = require('../constants/tasks');

module.exports = function(app, payload, callback) {
    app.emit(TasksContants.UPDATE_START, payload);

    app.getService('TasksService').update(payload, function(error, updated) {
        if (error) {
            app.emit(TasksContants.UPDATE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.UPDATE_SUCCESS, updated);
        callback && callback(null, updated);
    });
};

module.exports.name = 'update-task';