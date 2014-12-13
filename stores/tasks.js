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
        return this.tasks;
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
        var oldTask = _.first(this.tasks, {id: task.id});

        if (oldTask) {
            savedTask = _.clone(oldTask);

            oldTask.completed = task.completed;
            oldTask.text = task.text;

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
        var newTask = _.first(this.tasks, {id: savedTask.id});

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