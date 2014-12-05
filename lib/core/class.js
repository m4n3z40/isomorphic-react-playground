var _ = require('lodash');

function Class() {}

Class.extend = function(body) {
    var parent = this,
        statics,
        child;

    if (body && _.has(body, 'constructor')) {
        child = body.constructor;
    } else {
        child = function() { return parent.apply(this, arguments); };
    }

    if (body && _.has(body, 'statics')) {
        statics = body.statics;
        delete body.statics;

        child = _.assign(parent, statics);
    }

    child.prototype = Object.create(parent.prototype, {
        'constructor': {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (body) _.assign(child.prototype, body);

    child.__super__ = child.prototype.__super__ = parent.prototype;
    child.extend = Class.extend;

    return child;
};

module.exports = Class;