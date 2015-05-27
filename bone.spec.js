"use strict";

const expect = require('chai').expect;

const skinny = require('skinny');
const bone = require('./bone');

describe('Bone', function() {
    var newSkinny;

    before(function() {
        newSkinny = skinny.newSkinny();
    });

    it('should be attached to skinny with glob', function() {
        newSkinny.attach(bone, __dirname + '/tests/actions/*.js');

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