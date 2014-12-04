var Application = require('../../../lib/core/application');

describe('Application', function() {
    it('has to be defined and be a function', function() {
        expect(Application).toBeDefined();
        expect(Application).toEqual(jasmine.any(Function));
    });
});