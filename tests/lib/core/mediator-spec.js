var Mediator = require('../../../lib/core/mediator');

describe('Mediator', function() {
    var mediator,
        handler,
        handler1;

    beforeEach(function() {
        mediator = new Mediator();
        handler = jasmine.createSpy('handler');
        handler1 = jasmine.createSpy('handler2');
    });

    it('has to be defined and be a function', function() {
        expect(Mediator).toBeDefined();
        expect(Mediator).toEqual(jasmine.any(Function));
        expect(mediator).toEqual(jasmine.any(Mediator));
    });

    it('can register a event handler', function() {
        expect(mediator.hasHandlers('foo')).toBe(false);

        mediator.register('foo', handler);

        expect(mediator.hasHandlers('foo')).toBe(true);
    });

    it('can register and dispatch multiple events handlers', function() {
        mediator.register('foo', handler);
        mediator.register('foo', handler1);

        expect(handler.calls.count()).toEqual(0);
        expect(handler1.calls.count()).toEqual(0);

        mediator.dispatch('foo');

        expect(handler.calls.count()).toEqual(1);
        expect(handler1.calls.count()).toEqual(1);
    });

    it('can dispatch events with a payload data', function() {
        var payload = {'foo': 'bar'};

        mediator.register('foo', handler);

        mediator.dispatch('foo', payload);

        expect(handler).toHaveBeenCalledWith(payload);
    });

    it('can remove event handlers', function() {
        mediator.register('foo', handler);

        expect(mediator.hasHandlers('foo')).toBe(true);

        mediator.unregister('foo', handler);

        expect(mediator.hasHandlers('foo')).toBe(false);
    });

    it('can check if a event is currently being dispatched', function() {
        var handler = function() {
            expect(mediator.isDispatching('foo')).toBe(true);
        };

        mediator.register('foo', handler);
        mediator.dispatch('foo');
    });
});