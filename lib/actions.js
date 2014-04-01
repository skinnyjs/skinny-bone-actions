var inspector = require('schema-inspector');
var createError = require('create-error');
var thunkify = require('thunkify');

inspector.validate = thunkify(inspector.validate);

var ActionsError = createError('ActionsError', { actionName: '', actionParams: { } });
var InvalidParamsError = createError(ActionsError, 'InvalidParamsError');

function factory(skinny, actions) {
    "use strict";

    var wrappedActions = {};

    for (let name in actions) {
        let action = actions[name];

        wrappedActions[name] = function *runAction(params, actionSkinny) {
            try {
                actionSkinny = actionSkinny || skinny.newSkinny();

                // Validate params
                var schema = {
                    type: 'object',
                    properties: action.params
                };

                var result = yield inspector.validate(schema, params);

                if (!result.valid) {
                    throw new InvalidParamsError(result.format());
                }

                skinny.emit('beforeAction', name, params, actionSkinny);

                var response = yield action.run(params, actionSkinny);

                skinny.emit('afterAction', name, params, actionSkinny);

                return response;
            } catch (e) {
                e.actionName = name;
                e.actionParams = params;

                throw e;
            }
        }
    }

    Object.defineProperty(wrappedActions, 'ERRORS', {
        configurable: false,
        enumerable: false,
        value: {
            ActionsError: ActionsError,
            InvalidParamsError: InvalidParamsError
        }
    });

    return wrappedActions;
}

module.exports = factory;
