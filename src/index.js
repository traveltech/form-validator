import { initForms } from './validation/init.js'
import { addRule } from './validation/FormValidation.js'

//rules
import requiredRule from  './validation-rules/required.js'
import emailRule from  './validation-rules/email.js'

requiredRule()
emailRule()

initForms()

export {
  initForms,
  addRule
}