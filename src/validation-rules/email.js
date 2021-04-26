import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule(function(field, rules) {
    if (field.dataset.valEmail) {
      rules.push({
        type: 'email',
        message: field.dataset.valEmail
      })
    }
  })
}