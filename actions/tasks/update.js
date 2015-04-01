var TasksContants = require('../../constants/tasks');

/**
 * Updates a task and emits all events regarding its update
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 * @return {void}
 */
module.exports = function updateTask(app, payload, callback) {
    app.emit(TasksContants.UPDATE_START, payload);

    //Se não houver modificado o texto ou estado de completo, não chamar a API
    if (!payload.text && (typeof payload.completed === 'undefined')) {
        return;
    }

    app.getService('TasksService').update(payload, function(error, updated) {
        if (error) {
            app.emit(TasksContants.UPDATE_ERROR, error);
            return callback && callback(error);
        }

        app.emit(TasksContants.UPDATE_SUCCESS, updated);
        callback && callback(null, updated);
    });
};