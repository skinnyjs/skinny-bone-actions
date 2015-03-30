var Actions = require('./lib/actions');

module.exports = function attachActions(skinny, actionsOrPath) {
    "use strict";

    var actions = {};

    if (typeof actionsOrPath === 'string') {
        var path = actionsOrPath;

        require('fs').readdirSync(path).forEach((file) => {
            var actionsFromFile = require(path + '/' + file);

            for (var actionName in actionsFromFile) {
                if (actionsFromFile.hasOwnProperty(actionName)) {
                    actions[actionName] = actionsFromFile[actionName];
                }
            }
        });
    } else {
        actions = actionsOrPath;
    }

    skinny.actions = new Actions(skinny, actions);
};