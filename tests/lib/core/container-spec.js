var Container = require('../../../lib/core/container');

describe('Container', function() {
    var container;

    beforeEach(function() {
        container = new Container();
    });

    it('has to be defined and be a function', function() {
        expect(Container).toBeDefined();
        expect(Container).toEqual(jasmine.any(Function));
        expect(container).toEqual(jasmine.any(Container));
    });

    it('can register and retrieve a simple value', function() {
        container.registerValue('foo', 'bar');

        expect(container.get('foo')).toBe('bar');
    });

    it('can register and lazily retrieve a simple value', function() {
        var factory = jasmine.createSpy('factory', function() {
                return 'bar';
            }).and.callThrough();

        container.registerValue('foo', factory);

        expect(container.get('foo')).toBe('bar');
        expect(container.get('foo')).toBe('bar');

        expect(factory.calls.count()).toBe(1);
    });

    it('can register and retrieve an array value', function() {
        var arr = [1, 2, 3];

        container.registerValue('foo', arr);

        expect(container.get('foo')).toBe(arr);
    });

    it('can register and retrieve lazily an array value', function() {
        var arr = [1, 2, 3],
            factory = jasmine.createSpy('factory', function() {
                return arr;
            }).and.callThrough();

        container.registerValue('foo', factory);

        expect(container.get('foo')).toBe(arr);
        expect(container.get('foo')).toBe(arr);

        expect(factory.calls.count()).toBe(1);
    });

    it('can register and retrieve a singleton', function() {
        var singleton = { 'foo': 'bar' };

        container.registerSingleton('foo', singleton);

        expect(container.get('foo')).toBe(singleton);
    });

    it('can register and lazily retrieve a singleton', function() {
        var singleton = { 'foo': 'bar' },
            factory = jasmine.createSpy('factory', function() {
                return singleton;
            }).and.callThrough();

        container.registerSingleton('foo', factory);

        expect(container.get('foo')).toBe(singleton);
        expect(container.get('foo')).toBe(singleton);

        expect(factory.calls.count()).toBe(1);
    });

    it('can register and execute factories', function() {
        var factory = jasmine.createSpy('factory', function() {
                return 'bar';
            }).and.callThrough();

        container.registerFactory('foo', factory);

        expect(container.get('foo')).toBe('bar');
        expect(container.get('foo')).toBe('bar');

        expect(factory.calls.count()).toBe(2);
    });

    it('can remove values', function() {
        container.registerValue('foo', 'bar');

        expect(container.get('foo')).toBe('bar');

        container.remove('foo');

        expect(container.get('foo')).toBeNull();
    });

    it('can inject dependencies in a function using a helper method', function() {
        container.registerValue('foo', 'foo');
        container.registerValue('bar', 'bar');
        container.registerFactory('bar2', function() { return 'bar' });

        var injectedFoo = container.inject('foo', function(foo) {
                return foo;
            }),
            injectedFooBarBar = container.inject(['foo', 'bar', 'bar2'], function() {
                return Array.prototype.join.call(arguments, ' ');
            });

        expect(injectedFoo).toEqual(jasmine.any(Function));
        expect(injectedFoo()).toBe('foo');

        expect(injectedFooBarBar).toEqual(jasmine.any(Function));
        expect(injectedFooBarBar()).toBe('foo bar bar');
    });

    it('can inject dependencies in a function using the array notation', function() {
        container.registerValue('foo', 'foo');
        container.registerValue('bar', 'bar');
        container.registerFactory('bar2', function() { return 'bar' });

        var injectedFooBarBar = container.inject(['foo', 'bar', 'bar2', function() {
                return Array.prototype.join.call(arguments, ' ');
            }]);

        expect(injectedFooBarBar()).toBe('foo bar bar');
    });

    it('can call factories from within a context object', function() {
        var context = {};

        container.registerFactory('make', function() { return this; }, context);

        expect(container.get('make')).toBe(context);
    });
});