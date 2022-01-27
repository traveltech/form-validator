import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valNumber', function (field) {
    return {
      type: 'number',
      message: field.dataset.valNumber,
      transform (value) {
        return Number(value.trim())
      }
    }
  })
}