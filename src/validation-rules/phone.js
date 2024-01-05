import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valPhone', function (field) {
    return {
      type: 'string',
      pattern: /^[0-9]+$/,
      message: field.dataset.valPhone
    }
  })
}
