var defaultRequestHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

/**
 * Handles the response
 *
 * @param {Function} callback
 * @return {Function}
 */
function handleResponse(callback) {
    return function(response) {
        if (response.status != 200) {
            callback(new Error('Bad response from server'));
        }

        return response.json();
    };
}

/**
 * Parses the response data and handles errors
 *
 * @param {Function} callback
 * @return {Function}
 */
function handleErrors(callback) {
    return function(responseObj) {
        if (responseObj.code != 200) {
            callback(new Error(responseObj.message));
        }

        return responseObj.content;
    };
}

/**
 * Creates a task and adds it to the tasks list
 *
 * @param {Object} params
 * @param {Function} callback
 * @return {void}
 */
function create(params, callback) {
    var urls = this.config('urls');

    fetch(urls.apiBase + 'tasks', {
        method: 'post',
        headers: defaultRequestHeader,
        body: JSON.stringify(params)
    })

    .then(handleResponse(callback))

    .then(handleErrors(callback))

    .then(function(newTask) {
        callback(null, newTask);
    });
}

/**
 * Retrieves the list of tasks
 *
 * @param {Object} params
 * @param {Function} callback
 * @return {void}
 */
function read(params, callback) {
    var urls = this.config('urls');

    fetch(urls.apiBase + 'tasks')

    .then(handleResponse(callback))

    .then(handleErrors(callback))

    .then(function(tasks) {
        callback(null, tasks);
    });
}

/**
 * Updates a task content
 *
 * @param {Object} params
 * @param {Function} callback
 * @return {Object}
 */
function update(params, callback) {
    var urls = this.config('urls');

    fetch(urls.apiBase + 'tasks/' + params.id, {
        method: 'put',
        headers: defaultRequestHeader,
        body: JSON.stringify(params)
    })

    .then(handleResponse(callback))

    .then(handleErrors(callback))

    .then(function(task) {
        callback(null, task);
    });
}

/**
 * Removes a task
 *
 * @param {Object} params
 * @param {Function} callback
 * @return {Object}
 */
function remove(params, callback) {
    var urls = this.config('urls');

    fetch(urls.apiBase + 'tasks/' + params.id, {
        method: 'delete'
    })

    .then(handleResponse(callback))

    .then(handleErrors(callback))

    .then(function(task) {
        callback(null, task);
    });
}

/**
 * Expose the service API
 *
 * @param {Application} app
 * @return {Object}
 */
module.exports = function(app) {
    return {
        /**
         * The services identifier
         */
        name: 'TasksService',

        /**
         * Bind this on the create operation to the app instance
         */
        create: create.bind(app),

        /**
         * Bind this on the read operation to the app instance
         */
        read: read.bind(app),

        /**
         * Bind this on the update operation to the app instance
         */
        update: update.bind(app),

        /**
         * Bind this on the remove operation to the app instance
         */
        remove: remove.bind(app)
    };
};