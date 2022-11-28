"use strict";

exports.__esModule = true;
exports.default = _default;

var _FormValidation = require("../validation/FormValidation.js");

function _default() {
  (0, _FormValidation.addRule)('valRegex', function (field) {
    var pattern = field.dataset.valRegexPattern.trim();

    if (pattern.charAt(pattern.length - 1) === '/') {
      pattern = pattern.slice(0, -1);
    }

    if (pattern.charAt(0) === '/') {
      pattern = pattern.substr(1);
    }

    return {
      type: 'string',
      pattern: new RegExp(pattern),
      message: field.dataset.valRegex
    };
  });
}