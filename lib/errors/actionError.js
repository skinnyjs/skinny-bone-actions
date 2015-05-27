"use strict";

const createError = require('create-error');

const ActionError = createError('ActionError', { actionName: '', actionParams: { } });

module.exports = ActionError;