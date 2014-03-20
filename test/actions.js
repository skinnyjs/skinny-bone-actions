var expect = require('chai').expect;

var skinny = require('skinny');
var bone = require('../bone');
var co = require('co');

describe('Actions', function() {
    "use strict";

    before(function() {
        skinny.attach(bone, __dirname + '/actions');
    });

    it('should work', function *() {
        var result = yield skinny.actions.returnString({ string: 'ok' });

        expect(result).to.eql('ok');
    });

    it('should validate params', function *() {
        // TODO: We need use expect.to.throw, but i don't know how. https://github.com/ilkkao/co-mocha/issues/3

        var error;

        try {
           yield skinny.actions.returnString({ string: 123 });
        } catch (e) {
            error = e;
        }

        expect(error).to.be.an.instanceof(skinny.actions.ERRORS.InvalidParamsError);
    });
});