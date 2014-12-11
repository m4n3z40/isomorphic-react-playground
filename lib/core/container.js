var Class = require('./class'),
	_ = require('lodash');

var types = {
	VALUE: 0,
	FACTORY: 1,
	SINGLETON: 2
};

module.exports = Class.extend({
	/**
	 * Instantiates the container instance
	 *
	 * @constructor
	 */
	constructor: function() {
		this.__registry = {};
		this.__resolved = {};
	},

	/**
	 * Registers a simple value in the container
	 *
	 * @param {string} valueName
	 * @param {*} value
	 * @param {Object} scope
	 */
	registerValue: function(valueName, value, scope) {
		this.__addToRegistry(types.VALUE, valueName, value, scope);
	},

	/**
	 * Registers a factory in the container
	 *
	 * @param {string} factoryName
	 * @param {Function|array} factory
	 * @param {Object} scope
	 */
	registerFactory: function(factoryName, factory, scope) {
		this.__addToRegistry(types.FACTORY, factoryName, factory, scope);
	},

	/**
	 * Registers a singleton in the container
	 *
	 * @param {string} singletonName
	 * @param {*} singleton
	 * @param {Object} scope
	 */
	registerSingleton: function(singletonName, singleton, scope) {
		this.__addToRegistry(types.SINGLETON, singletonName, singleton, scope);
	},

	/**
	 * Removes a value from the container
	 *
	 * @param {string} name
	 * @returns {void}
	 */
	remove: function(name) {
		var resolved = this.__resolved,
			registry = this.__registry;

		if (name in resolved) delete resolved[name];

		if (name in registry) delete registry[name];
	},

	/**
	 * Gets a dependency registered in the container
	 *
	 * @param {string} name
	 * @returns {*}
	 */
	get: function(name) {
		var resolved = this.__resolved;

		if (name in resolved) return resolved[name];

		return this.__resolveFromRegistry(name);
	},

	/**
	 * Injects the dependencies of the passed function as described
	 * in the dependencies parameter (in the exact same order)
	 *
	 * @param {string|array} dependencies
	 * @param {Function} callable
	 * @param {Object} scope
	 * @returns {Function}
	 */
	inject: function(dependencies, callable, scope) {
		if (_.isString(dependencies)) {
			return this.__injectOne(dependencies, callable, scope);
		} else if (_.isArray(dependencies)) {
			return this.__injectFromArray(dependencies, callable, scope);
		}

		throw new Error('Invalid parameter. First parameter must be a dependency name or list of names.');
	},

	/**
	 * Returns true if passed array is an injectable array notation,
	 * returns false otherwise.
	 *
	 * @param {Array} array
	 * @returns {boolean}
	 */
	isInjectableArray: function(array) {
		return _.isFunction(array[array.length - 1]);
	},

	/**
	 * Injects the dependencies passed in the array format
	 *
	 * @param {array} dependencies
	 * @param {Function} callable
	 * @param {Object} scope
	 * @returns {Function}
	 * @private
	 */
	__injectFromArray: function(dependencies, callable, scope) {
		if (this.isInjectableArray(dependencies)) {
			callable = dependencies.pop();
		}

		if (dependencies.length <= 1) {
			return this.__injectOne(dependencies[0], callable, scope);
		}

		return this.__injectMany(dependencies, callable, scope);
	},

	/**
	 * Inject exactly one dependency in the passed function
	 *
	 * @param {string} dependency
	 * @param {Function} callable
	 * @param {Object} scope
	 * @returns {Function}
	 * @private
	 */
	__injectOne: function(dependency, callable, scope) {
		if (!_.isFunction(callable)) {
			throw new Error('Invalid parameter. Second parameter must be a function.');
		}

		var dep = dependency ? this.get(dependency) : null;

		return scope ?
			function() { return callable.call(scope, dep) } :
			function() { return callable(dep) };
	},

	/**
	 * Injects the dependencies of the passed function as described
	 * in the dependencies parameter (in the exact same order)
	 *
	 * @param {array} dependencies
	 * @param {Function} callable
	 * @param {Object} scope
	 * @returns {Function}
	 * @private
	 */
	__injectMany: function(dependencies, callable, scope) {
		if (!_.isFunction(callable)) {
			throw new Error('Invalid parameter. Second parameter must be a function.');
		}

		var me = this,
			injections = [];

		_.forEach(dependencies, function(dep) {
			injections.push(me.get(dep));
		});

		return function() { return callable.apply(scope, injections); };
	},

	/**
	 * Adds a object to the container
	 *
	 * @param {string} type
	 * @param {string} name
	 * @param {*} value
	 * @param {Object} scope
	 * @private
	 */
	__addToRegistry: function(type, name, value, scope) {
		this.__registry[name] = {name: name, type: type, value: value, scope: scope};
	},

	/**
	 * Caches the value of a resolved dependency
	 *
	 * @param {object} resolver
	 * @param {*} value
	 * @private
	 */
	__cacheResolved: function(resolver, value) {
		if (resolver.type === types.VALUE || resolver.type === types.SINGLETON) {
			this.__resolved[resolver.name] = value;
		}
	},

	/**
	 * Resolve the dependency on the container, tf it exists
	 *
	 * @param {string} name
	 * @returns {*}
	 * @private
	 * @private
	 */
	__resolveFromRegistry: function(name) {
		if (!(name in this.__registry)) return null;

		var resolver = this.__registry[name],
			value = resolver.value;

		if (_.isFunction(value)) {
			value = resolver.scope ? value.call(resolver.scope) : value();

			this.__cacheResolved(resolver, value);
		} else if (_.isArray(value) && this.isInjectableArray(value)) {
			value = this.__injectFromArray(value, null, resolver.scope)();

			this.__cacheResolved(resolver, value);
		}

		return value;
	}
});