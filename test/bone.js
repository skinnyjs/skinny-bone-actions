var expect = require('chai').expect;

var skinny = require('skinny');
var bone = require('../bone');

describe('Bone', function() {
    "use strict";

    before(function() {
        skinny = skinny.newSkinny();
    });

    it('should be attached to skinny with actions path', function() {
        skinny.attach(bone, __dirname + '/actions');

        expect(skinny).to.have.ownProperty('actions');
        expect(skinny.actions.returnString).to.be.a('function');
    });

    it('should be attached to skinny with actions object', function() {
        var actions = require('./actions/returnString');
        skinny.attach(bone, actions);

        expect(skinny).to.have.ownProperty('actions');
        expect(skinny.actions.returnString).to.be.a('function');
    });
});