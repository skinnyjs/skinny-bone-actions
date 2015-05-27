"use strict";

const inspector = require('schema-inspector');
const createError = require('create-error');
const thenifyAll = require('thenify-all');

inspector.validate = thenifyAll.thenify(inspector.validate);

var InvalidParamsError = require('./errors/invalidParamsError');

function factory(skinny, actions) {
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

    return wrappedActions;
}

module.exports = factory;