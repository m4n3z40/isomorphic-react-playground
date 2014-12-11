var Store = require('../lib/core/store'),
    TasksContants = require('../constants/tasks');

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
        this.filteredTasks = [];
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

    getAllFiltered: function() {
        return this.filteredTasks;
    },

    saveState: function() {
        return {
            tasks: this.tasks
        };
    },

    restoreState: function(state) {
        this.tasks = state;
    },

    _onRetrieveSuccess: function(payload) {

    },

    _onCreateStart: function(payload) {

    },

    _onCreateError: function(payload) {

    },

    _onUpdateStart: function(payload) {

    },

    _onUpdateError: function(payload) {

    },

    _onDestroyStart: function(payload) {

    },

    _onDestroyError: function(payload) {

    },

    _onFilter: function(payload) {

    }
});