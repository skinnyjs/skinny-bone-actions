"use strict";

var expect = require('chai').expect;

var skinny = require('skinny');
var bone = require('./bone');

describe('Bone', function() {
    var newSkinny;

    before(function() {
        newSkinny = skinny.newSkinny();
    });

    it('should be attached to skinny with actions path', function() {
        newSkinny.attach(bone, __dirname + '/tests/actions');

        expect(newSkinny).to.have.ownProperty('actions');
        expect(newSkinny.actions).to.respondTo('returnString');
    });

    it('should be attached to skinny with actions object', function() {
        var actions = require('./tests/actions/returnString');
        newSkinny.attach(bone, actions);

        expect(newSkinny).to.have.ownProperty('actions');
        expect(newSkinny.actions).to.respondTo('returnString');
    });
});