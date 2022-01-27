import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valMinlength', function (field) {
    return {
      type: 'string',
      min: parseInt(field.dataset.valMinlengthMin),
      message: field.dataset.valMinlength
    }
  })
}