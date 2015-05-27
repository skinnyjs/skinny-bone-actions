"use strict";

const createError = require('create-error');
const ActionError = require('./actionError');

const InvalidParamsError = createError(ActionError, 'InvalidParamsError');

module.exports = InvalidParamsError;