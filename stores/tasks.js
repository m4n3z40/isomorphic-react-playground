var _ = require('lodash'),
    Store = require('../lib/core/store'),
    TasksContants = require('../constants/tasks'),
    savedTask;

module.exports = Store.extend({
    /**
     * Identifier of the store
     *
     * @type {string}
     */
    name: 'TasksStore',

    /**
     * Returns the default handlers for actions that the store listens to
     *
     * @return {Object}
     */
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

    /**
     * Initializes the store
     *
     * @returns {void}
     */
    initialize: function() {
        this.tasks = [];
        this.__appliedFilters = {};
    },

    /**
     * Returns a new task object
     *
     * @param {string} task
     * @return {Object}
     */
    createTask: function(task) {
        return {
            id: 'tsk_' + (new Date()).valueOf(),
            completed: false,
            editing: false,
            text: task
        };
    },

    /**
     * Returns all tasks present now in the store
     *
     * @return {Array}
     */
    getAll: function() {
        var tasks =  this.tasks,
            filters = this.__appliedFilters;

        if (filters.hideCompleted) {
            tasks = _.filter(tasks, {'completed': false});
        }

        if (filters.byText) {
            tasks = _.filter(tasks, function(task) {
                return task.text.toLowerCase().indexOf(filters.byText.toLowerCase()) > -1;
            });
        }

        return tasks;
    },

    /**
     * Returns the current state of the store for being restored later
     *
     * @return {Object}
     */
    saveState: function() {
        return {tasks: this.tasks};
    },

    /**
     * Restores the saved state of the store
     *
     * @param {string} state
     * @return {void}
     */
    restoreState: function(state) {
        this.tasks = state.tasks || [];
    },

    /**
     * Handler for when the retrieve_success action is executed
     *
     * @param {Array} tasks
     * @return {void}
     * @protected
     */
    _onRetrieveSuccess: function(tasks) {
        this.tasks = tasks;

        this.emitChanges();
    },

    /**
     * Handler for when the create_start action is executed
     *
     * @param {Object} task
     * @return {void}
     * @protected
     */
    _onCreateStart: function(task) {
        this.tasks.push(task);

        this.emitChanges();
    },

    /**
     * Handler for when the create_error action is executed
     *
     * @param {Error} error
     * @return {void}
     * @protected
     */
    _onCreateError: function(error) {
        this.tasks.pop();

        this.emitChanges();
    },

    /**
     * Handler for when the update_start action is executed
     *
     * @param {Object} task
     * @return {void}
     * @protected
     */
    _onUpdateStart: function(task) {
        var taskIndex = _.findIndex(this.tasks, {'id': task.id}),
            oldTask, newTask;

        if (taskIndex > -1) {
            oldTask = this.tasks[taskIndex];
            newTask = _.assign({}, oldTask, task);

            savedTask = _.clone(oldTask);

            this.tasks.splice(taskIndex, 1, newTask);

            this.emitChanges();
        }
    },

    /**
     * Handler for when the update_error action is executed
     *
     * @param {Error} error
     * @return {void}
     * @protected
     */
    _onUpdateError: function(error) {
        var newTask = _.find(this.tasks, {'id': savedTask.id});

        if (newTask) {
            newTask.completed = savedTask.completed;
            newTask.text = savedTask.text;

            savedTask = null;

            this.emitChanges();
        }
    },

    /**
     * Handler for when the destroy_start action is executed
     *
     * @param {Object} task
     * @return {void}
     * @protected
     */
    _onDestroyStart: function(task) {
        _.remove(this.tasks, {id: task.id});

        savedTask = task;

        this.emitChanges();
    },

    /**
     * Handler for when the destroy_error action is executed
     *
     * @return {void}
     * @protected
     */
    _onDestroyError: function() {
        this.tasks.push(savedTask);

        savedTask = null;

        this.emitChanges();
    },

    /**
     * Handler for when the filter action is executed
     *
     * @param {Object} filter
     * @protected
     */
    _onFilter: function(filter) {
        this.__appliedFilters = filter;

        this.emitChanges();
    }
});