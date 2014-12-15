var _ = require('lodash'),
    _tasks = [];

module.exports = {
    /**
     * The services identifier
     */
    name: 'TasksService',

    /**
     * Creates a task and adds it to the tasks list
     *
     * @param {Object} params
     * @param {Function} callback
     * @return {void}
     */
    create: function(params, callback) {
        var newTask = {
            id: params.id,
            completed: params.completed,
            text: params.text
        };

        _tasks.push(newTask);

        callback(null, newTask);
    },

    /**
     * Retrieves the list of tasks
     *
     * @param {Object} params
     * @param {Function} callback
     * @return {void}
     */
    read: function(params, callback) {
        callback(null, _tasks.concat());
    },

    /**
     * Updates a task content
     *
     * @param {Object} params
     * @param {Function} callback
     * @return {Object}
     */
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

    /**
     * Removes a task
     *
     * @param {Object} params
     * @param {Function} callback
     * @return {Object}
     */
    remove: function(params, callback) {
        var removed = _.remove(_tasks, {id: params.id});

        if (removed.length === 0) {
            return callback(new Error('Task not found'));
        }

        callback(null, removed[0]);
    }
};