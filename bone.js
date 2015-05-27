"use strict";

const Actions = require('./lib/actions');
const glob = require('glob');
const fs = require('fs');

module.exports = function attachActions(skinny, actionsOrGlob) {
    let actions = {};

    if (typeof actionsOrGlob === 'string') {
        let path = actionsOrGlob;

        let actionsPaths = glob.sync(actionsOrGlob);

        if (actionsPaths.length === 0) {
            throw new TypeError(`Actions by glob ${actionsOrGlob} not found`);
        }

        actionsPaths.forEach(function(path) {
            path = fs.realpathSync(path)
            var actionsFromFile = require(path);

            for (var actionName in actionsFromFile) {
                if (actionsFromFile.hasOwnProperty(actionName)) {
                    actions[actionName] = actionsFromFile[actionName];
                }
            }
        });
    } else {
        actions = actionsOrGlob;
    }

    skinny.actions = new Actions(skinny, actions);
};