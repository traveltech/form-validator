import { addRule, FormValidation } from './validation/FormValidation'
import { initForm, initForms } from './validation/init'

//rules
import required from  './validation-rules/required'

addRule(required)

initForms()