export default function(field, rules) {
  if (field.dataset.valRequired) {
    switch (field.type) {
      case 'checkbox':
        rules.push({
          type: 'boolean',
          required: true,
          message: field.dataset.valRequired,
          transform (value) {
            return field.checked
          }
        })
        break
      default:
        rules.push({
          type: 'string',
          required: true,
          message: field.dataset.valRequired
        })
    }
  }
}