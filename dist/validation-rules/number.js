"use strict";

exports.__esModule = true;
exports.default = _default;
var _FormValidation = require("../validation/FormValidation.js");
function _default() {
  (0, _FormValidation.addRule)('valNumber', function (field) {
    return {
      type: 'number',
      message: field.dataset.valNumber,
      transform(value) {
        if (value && value.trim) {
          return Number(value.trim());
        }
        return value;
      }
    };
  });
}