import { initForms } from './validation/init.js'
import { addRule } from './validation/FormValidation.js'

// rules
import requiredRule from './validation-rules/required.js'
import emailRule from './validation-rules/email.js'
import maxlengthRule from './validation-rules/maxLength.js'
import minlengthRule from './validation-rules/minLength.js'
import numberRule from './validation-rules/number.js'
import phoneRule from './validation-rules/phone.js'
import regexRule from './validation-rules/regex.js'

const setupValidation = function() {
  requiredRule()
  emailRule()
  maxlengthRule()
  minlengthRule()
  numberRule()
  phoneRule()
  regexRule()
}

export {
  initForms,
  setupValidation,
  addRule
}
