var Class = require('../../../lib/core/class');

var Parent = Class.extend({
    constructor: function() {
        this.foo = 'foo';
    },

    statics: {
        foo: function() {
            return 'foo';
        }
    }
});

var Child = Parent.extend({
    constructor: function() {
        this.__super__.constructor.apply(this, arguments);
        this.bar = 'bar';
    }
});

describe('Class', function() {
    var parentObj, childObj;

    beforeEach(function() {
        parentObj = new Parent();
        childObj = new Child();
    });

    it('has to be defined and be a function', function() {
        expect(Class).toBeDefined();
        expect(Class).toEqual(jasmine.any(Function));
    });

    it('Creates an instantiable object', function() {
        expect(parentObj).not.toBeFalsy();
        expect(parentObj instanceof Parent).toBe(true);
    });

    it('extends the parent properties', function() {
        expect(parentObj.foo).toBe('foo');
        expect(childObj.foo).toBe('foo');
        expect(childObj.bar).toBe('bar');
    });

    it('lets access parent from child', function() {
        expect(childObj.__super__).toBe(Parent.prototype);
    });

    it('extends static functions as well', function() {
        expect(Parent.foo()).toBe('foo');
    });
});