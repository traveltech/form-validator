"use strict";

exports.__esModule = true;
exports.default = _default;
var _FormValidation = require("../validation/FormValidation.js");
function _default() {
  (0, _FormValidation.addRule)('valMinlength', function (field) {
    return {
      type: 'string',
      min: parseInt(field.dataset.valMinlengthMin),
      message: field.dataset.valMinlength
    };
  });
}