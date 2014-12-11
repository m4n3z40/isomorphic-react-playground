var TasksContants = require('../constants/tasks');

module.exports = function(app, payload, callback) {
    app.emit(TasksContants.CREATE_START, payload);

    app.getService('TasksService').create(payload, function(error, created) {
        if (error) {
            app.emit(TasksContants.CREATE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.CREATE_SUCCESS, created);
        callback && callback(null, created);
    });
};


module.exports.name = 'create-task';