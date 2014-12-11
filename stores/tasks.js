var _ = require('lodash'),
    Store = require('../lib/core/store'),
    TasksContants = require('../constants/tasks'),
    savedTask;

module.exports = Store.extend({
    name: 'TasksStore',

    getDefaultHandlers: function() {
        var handlers = {};

        handlers[TasksContants.RETRIEVE_SUCCESS] = '_onRetrieveSuccess';
        handlers[TasksContants.CREATE_START] = '_onCreateStart';
        handlers[TasksContants.CREATE_ERROR] = '_onCreateError';
        handlers[TasksContants.UPDATE_START] = '_onUpdateStart';
        handlers[TasksContants.UPDATE_ERROR] = '_onUpdateError';
        handlers[TasksContants.DESTROY_START] = '_onDestroyStart';
        handlers[TasksContants.DESTROY_ERROR] = '_onDestroyError';
        handlers[TasksContants.FILTER] = '_onFilter';

        return handlers;
    },

    initialize: function() {
        this.tasks = [];
    },

    createTask: function(task) {
        return {
            id: 'tsk_' + (new Date()).valueOf(),
            completed: false,
            editing: false,
            text: task
        };
    },

    getAll: function() {
        return this.tasks;
    },

    saveState: function() {
        return {
            tasks: this.tasks
        };
    },

    restoreState: function(state) {
        this.tasks = state.tasks;
    },

    _onRetrieveSuccess: function(tasks) {
        this.tasks = tasks;

        this.emitChanges();
    },

    _onCreateStart: function(task) {
        this.tasks.push(task);

        this.emitChanges();
    },

    _onCreateError: function(error) {
        this.tasks.pop();

        this.emitChanges();
    },

    _onUpdateStart: function(task) {
        var oldTask = _.first(this.tasks, {id: task.id});

        if (oldTask) {
            savedTask = _.clone(oldTask);

            oldTask.completed = task.completed;
            oldTask.text = task.text;

            this.emitChanges();
        }
    },

    _onUpdateError: function(error) {
        var newTask = _.first(this.tasks, {id: savedTask.id});

        if (newTask) {
            newTask.completed = savedTask.completed;
            newTask.text = savedTask.text;

            savedTask = null;

            this.emitChanges();
        }
    },

    _onDestroyStart: function(task) {
        _.remove(this.tasks, {id: task.id});

        savedTask = task;

        this.emitChanges();
    },

    _onDestroyError: function(error) {
        this.tasks.push(savedTask);

        savedTask = null;

        this.emitChanges();
    },

    _onFilter: function(filter) {
        var tasks = this.tasks;

        if (filter.byCompleted) {
            tasks = _.filter(this.tasks, 'completed');
        }

        if (filter.byText) {
            tasks = _.filter(this.tasks, function(task) {
                new RegExp(filter.byText).test(task.text);
            });
        }

        this.tasks = tasks;

        this.emitChanges();
    }
});