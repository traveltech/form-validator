"use strict";

exports.__esModule = true;
exports.initForms = exports.initForm = void 0;

var _FormValidation = require("./FormValidation.js");

var initForm = function initForm(form) {
  var val = new _FormValidation.FormValidation(form);

  if (form.validator) {
    form.validator.init();
  } else {
    var _val = new _FormValidation.FormValidation(form);

    if (_val.fields.length > 0) {
      _val.setUpEvents();

      form.validator = _val;
    }
  }
};

exports.initForm = initForm;

var initForms = function initForms() {
  var forms = document.querySelectorAll('form');

  for (var form of forms) {
    initForm(form);
  }

  document.addEventListener('form-updated', function (e) {
    var forms = e.target.querySelectorAll('form');

    for (var _form of forms) {
      initForm(_form);
    }
  });
};

exports.initForms = initForms;