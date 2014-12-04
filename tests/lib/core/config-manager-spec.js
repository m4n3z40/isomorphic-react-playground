var ConfigManager = require('../../../lib/core/config-manager');

describe('ConfigManager', function() {
    var config;

    beforeEach(function() {
        config = new ConfigManager();
    });

    it('has to be defined, be a function and can be instantiated', function() {
        expect(ConfigManager).toBeDefined();
        expect(ConfigManager).toEqual(jasmine.any(Function));
        expect(config).toEqual(jasmine.any(ConfigManager));
    });

    it('can set and get a config value', function() {
        config.set('foo', 'bar');

        expect(config.has('foo')).toBe(true);
        expect(config.get('foo')).toBe('bar');
    });

    it('can set many config values with an array', function() {
        var confs = [
                {name: 'foo', content: 'bar'},
                {name: 'foo1', content: 'bar2'},
                {name: 'foo2', content: 'bar3'}
            ];

        config.setMany(confs);

        confs.forEach(function(conf) {
            expect(config.get(conf.name)).toBe(conf.content);
        });
    });

    it('can set many config values with an object', function() {
        var confs = {
                'foo': 'bar',
                'foo1': 'bar2',
                'foo2': 'bar3'
            };

        config.setMany(confs);

        for(var key in confs) {
            expect(config.get(key)).toBe(confs[key]);
        }
    });
});