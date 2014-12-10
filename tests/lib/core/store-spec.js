var Mediator = require('../../../lib/core/mediator');
var Store = require('../../../lib/core/store');

describe('Store', function() {
    var mediator;
    var store;
    var ChildStoreClass;

    beforeEach(function() {
        mediator = new Mediator();

        spyOn(mediator, 'register').and.callThrough();
        spyOn(mediator, 'unregister').and.callThrough();
        spyOn(mediator, 'dispatch').and.callThrough();

        store = new Store(mediator);

        spyOn(Store.prototype, 'initialize');

        ChildStoreClass = Store.extend({
            getDefaultHandlers: function() {
                return {
                    'event1': 'handler1',
                    'event2': 'handler2'
                };
            },
            handler1: function(payload) { return payload; },
            handler2: function(payload) { return payload; }
        });

        spyOn(ChildStoreClass.prototype, 'handler1');
        spyOn(ChildStoreClass.prototype, 'handler2');
    });

    it('has to be defined, be a function and can be instantiated', function() {
        expect(Store).toBeDefined();
        expect(Store).toEqual(jasmine.any(Function));
        expect(store).toEqual(jasmine.any(Store));
    });

    it('holds a mediator instance', function() {
        var myMediator = store.getMediator();

        expect(myMediator).toEqual(jasmine.any(Mediator));
        expect(myMediator).toBe(mediator);
    });

    it('can register change listeners and notify changes', function() {
        var handler = jasmine.createSpy('handler', function(){}).and.callThrough();

        store.registerListener(handler);

        expect(store.hasListeners()).toBe(true);

        store.emitChanges();

        expect(handler).toHaveBeenCalledWith(store);

        store.emitChanges();

        expect(handler).toHaveBeenCalledWith(store);
        expect(handler.calls.count()).toBe(2);

        store.removeListener(handler);

        expect(store.hasListeners()).toBe(false);
    });

    it('can be extended and register children`s default handlers', function() {
        var handler3 = jasmine.createSpy('handler3', function(){}).and.callThrough(),
            childStore = new ChildStoreClass(mediator, {'event3': handler3}),
            payload = {'foo': 'bar'};

        expect(mediator.hasHandlers('event1')).toBe(true);
        expect(mediator.hasHandlers('event2')).toBe(true);
        expect(mediator.hasHandlers('event3')).toBe(true);

        mediator.dispatch('event1', payload);
        mediator.dispatch('event2', payload);
        mediator.dispatch('event3', payload);

        expect(childStore.handler1).toHaveBeenCalledWith(payload);
        expect(childStore.handler2).toHaveBeenCalledWith(payload);
        expect(handler3).toHaveBeenCalledWith(payload);
    });

    it('lends some utility hooks to his children', function() {
        var childStore = new ChildStoreClass(mediator);

        expect(childStore.initialize).toHaveBeenCalled();
        expect(childStore.saveState).toEqual(jasmine.any(Function));
        expect(childStore.restoreState).toEqual(jasmine.any(Function));
    });
});