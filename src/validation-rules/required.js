import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valRequired', function (field) {
    if (field.type === 'checkbox') {
      const fields = document.querySelectorAll(`[name="${field.name}"]`)

      if (fields.length > 1) {
        return {
          type: 'boolean',
          required: true,
          message: field.dataset.valRequired,
          validator: (rule, value) => [...fields].filter(x => x.checked).length > 0
        }
      } else {
        return {
          type: 'boolean',
          required: true,
          message: field.dataset.valRequired,
          validator: (rule, value) => field.checked
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
      message: field.dataset.valRequired,
      transform(value) {
        if (value && value.trim) {
          return value.trim()
        }
        return value
      }
    }
  })
}
