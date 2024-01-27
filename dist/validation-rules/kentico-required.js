"use strict";

exports.__esModule = true;
exports.default = _default;
var _FormValidation = require("@chrisjwarnes/form-validator/src/validation/FormValidation.js");
function _default() {
  (0, _FormValidation.addRule)('valRequired', function (field) {
    // ignore kentico checkbox invalid field validation.

    if (field.hasAttribute('data-ktc-notobserved-element')) {
      if (field.type === 'checkbox' || field.type === 'radio') {
        return {
          type: 'string',
          required: true,
          message: field.dataset.valRequired,
          validator: (rule, value) => true
        };
      }
    }
    if (field.type === 'checkbox') {
      var fields = document.querySelectorAll("[name=\"" + field.name + "\"]");
      if (fields.length > 1) {
        return {
          type: 'boolean',
          required: true,
          message: field.dataset.valRequired,
          validator: (rule, value) => [...fields].filter(x => x.checked).length > 0
        };
      } else {
        return {
          type: 'boolean',
          required: true,
          message: field.dataset.valRequired,
          validator: (rule, value) => field.checked
        };
      }
    }
    if (field.type === 'file') {
      return {
        type: 'string',
        required: true,
        message: field.dataset.valRequired,
        validator: (rule, value) => field.files.length > 0
      };
    }
    return {
      type: 'string',
      required: true,
      message: field.dataset.valRequired,
      transform(value) {
        if (value && value.trim) {
          return value.trim();
        }
        return value;
      }
    };
  });
}