import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valRequired', function (field) {
    if (field.type === 'checkbox') {
      return {
        type: 'boolean',
        required: true,
        message: field.dataset.valRequired,
        transform (value) {
          return field.checked
        }
      }
    }

    if (field.type === 'file') {
      return {
        type: 'string',
        required: true,
        message: field.dataset.valRequired,
        validator: (rule, value) => field.files.length > 0
      }
    }

    return {
      type: 'string',
      required: true,
      message: field.dataset.valRequired
    }

  })
}
