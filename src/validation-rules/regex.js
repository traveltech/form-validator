import { addRule } from '../validation/FormValidation.js'
export default function () {
  addRule('valRegex', function (field) {
    let pattern = field.dataset.valRegexPattern.trim()

    if (pattern.charAt(pattern.length - 1) === '/') {
      pattern = pattern.slice(0, -1)
    }

    if (pattern.charAt(0) === '/') {
      pattern = pattern.substr(1)
    }

    return {
      type: 'string',
      pattern: new RegExp(pattern),
      message: field.dataset.valRegex
    }
  })
}