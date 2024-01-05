"use strict";

exports.__esModule = true;
exports.default = _default;

var _FormValidation = require("../validation/FormValidation.js");

function _default() {
  (0, _FormValidation.addRule)('valPhone', function (field) {
    return {
      type: 'string',
      pattern: /^[0-9]+$/,
      message: field.dataset.valPhone
    };
  });
}
