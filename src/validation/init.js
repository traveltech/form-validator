import { FormValidation } from './FormValidation.js'

export const initForm = function (form) {
  var val = new FormValidation(form)

  if (val.fields.length > 0) {
    val.initRules()
    val.setUpEvents()

    form.validator = val
  }
}

export const initForms = function () {
  var forms = document.querySelectorAll('form')

  for (const form of forms) {
    initForm(form)
  }

  document.addEventListener('form-updated', function (e) {
    var forms = e.target.querySelectorAll('form')

    for (const form of forms) {
      initForm(form)
    }
  })
}
