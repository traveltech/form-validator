import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valMaxlength', function (field) {
    return {
      type: 'string',
      max: parseInt(field.dataset.valMaxlengthMax),
      message: field.dataset.valMaxlength
    }
  })
}