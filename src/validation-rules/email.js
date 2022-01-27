import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valEmail', function (field) {
    return {
      type: 'email',
      message: field.dataset.valEmail
    }
  })
}