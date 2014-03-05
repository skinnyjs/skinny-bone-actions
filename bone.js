var Actions = require('./actions');

module.exports = function attachActions(skinny, path) {
    "use strict";

    var actions = {};

    require('fs').readdirSync(path).forEach(function(file) {
        var actionsFromFile = require(path + '/' + file);

        for (var actionName in actionsFromFile) {
            if (actionsFromFile.hasOwnProperty(actionName)) {
                actions[actionName] = actionsFromFile[actionName];
            }
        }
    });

    skinny.actions = new Actions(skinny, actions);
};