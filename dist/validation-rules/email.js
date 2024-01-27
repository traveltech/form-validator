"use strict";

exports.__esModule = true;
exports.default = _default;
var _FormValidation = require("../validation/FormValidation.js");
function _default() {
  (0, _FormValidation.addRule)('valEmail', function (field) {
    return {
      type: 'email',
      message: field.dataset.valEmail
    };
  });
}