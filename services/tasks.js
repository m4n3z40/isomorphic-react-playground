var _ = require('lodash'),
    _tasks = [];

module.exports = {
    name: 'TasksService',

    create: function(params, callback) {
        var newTask = {
            id: params.id,
            completed: params.completed,
            text: params.text
        };

        _tasks.push(newTask);

        callback(null, newTask);
    },

    read: function(params, callback) {
        callback(null, _tasks.concat());
    },

    update: function(params, callback) {
        var task = _.first(_tasks, {id : params.id});

        if (!task) {
            return callback(new Error('Task not founf'));
        }

        if (task) {
            task.text = params.text;
            task.completed = params.completed;
        }

        callback(null, _.clone(task));
    },

    remove: function(params, callback) {
        var removed = _.remove(_tasks, {id: params.id});

        if (removed.length === 0) {
            return callback(new Error('Task not found'));
        }

        callback(null, removed[0]);
    }
};