"use strict";

exports.__esModule = true;
exports.default = _default;
var _FormValidation = require("../validation/FormValidation.js");
function _default() {
  (0, _FormValidation.addRule)('valMaxlength', function (field) {
    return {
      type: 'string',
      max: parseInt(field.dataset.valMaxlengthMax),
      message: field.dataset.valMaxlength
    };
  });
}