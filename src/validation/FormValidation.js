import Schema from '../../node_modules/async-validator/dist-web/index.js'

const ruleDefinitions = []

const inputValidClass = 'input-validation-valid'
const inputErrorClass = 'input-validation-error'

const summaryValidClass = 'validation-summary-valid'
const summaryErrorClass = 'validation-summary-errors'

const messageValidClass = 'field-validation-valid'
const messageErrorClass = 'field-validation-error'


export const addRule = function(rule) {
  ruleDefinitions.push(rule)
  document.dispatchEvent(new CustomEvent('form-updated'))
}

export class FormValidation {
  constructor (form) {
    this.form = form
    this.fields = form.querySelectorAll('[data-val="true"]')
    this.summary = this.form.querySelector('[data-valmsg-summary="true"]')
  }

  setUpEvents () {
    var _this = this

    if (!this.form.dataset.ajax) {
      this.form.addEventListener('submit',(e) => {
        if (!this.form.dataset.valid) {
          e.preventDefault()
          this.validateForm().then(function () {
            this.form.dataset.valid = true
            this.form.submit()
          }).catch(function (errors, fields) {
            e.preventDefault()
          })
        }
      })
    }

    for (const field of this.fields) {
      field.addEventListener('blur', function () {
        try {
          this.validateField(field)
        } catch (err) {
        }
      })

      field.addEventListener('change', function () {
        try {
          this.validateField(field)
        } catch (err) {
        }
      })
    }
  }

  initRules () {

    let definition = {}
    for (const field of this.fields) {
      definition[field.name] = this.setupRules(field)
    }

    this.validator = new Schema(definition)
  }

  setupRules (field) {
    const rules = []
    for (const rule of ruleDefinitions) {
      rule(field, rules)
    }

    if (rules.length > 0 & field.name.length > 0) {
      return rules.length > 1 ? rules : rules[0]
    }
  }

  handleErrors (errors, fields) {
    for (var key in fields) {
      const field = fields[key]
      this.displayError(field[0])
    }
    this.validationSummary(errors)
  }

  handleFieldError (errors, fields, field) {
    if (fields.hasOwnProperty(field.name)) {
      const err = fields[field.name]
      this.displayError(err[0])
    } else {
      this.clearErrors(field)
    }
  }

  clearPreviousErrors () {
    var errors = this.form.querySelectorAll(`.${inputErrorClass}`)
    for (const error of errors) {
      error.classList.remove(inputErrorClass)
    }
    if (this.summary) {
      if (!this.summary.classList.contains(summaryValidClass)) {
        this.summary.classList.add(summaryValidClass)
      }
      if (this.summary.classList.contains(summaryErrorClass)) {
        this.summary.classList.remove(summaryErrorClass)
      }
    }

    var messages = this.form.querySelectorAll(`.${messageErrorClass}`)

    for (const message of messages) {
      message.classList.remove(messageErrorClass)
      message.classList.add(messageValidClass)
      message.innerText = ''
    }
  }

  validationSummary (errors) {
    if (this.summary) {
      const list = this.summary.firstChild
      for (let i = 0; i < errors.length; i++) {
        const error = errors[i]
        const li = document.createElement('li')
        li.innerText = error.message
        li.setAttribute('data-error-for', error.field)
        list.appendChild(li)
      }
      this.summary.classList.remove(summaryValidClass)
      this.summary.classList.add(summaryErrorClass)
    }
  }

  displayError (field) {
    var elem = this.form.querySelector(`[name="${field.field}"]`)

    if (elem) {
      elem.classList.add(inputErrorClass)

      var label = this.form.querySelector(`[data-valmsg-for="${field.field}"]`)

      if (label && label.dataset.valmsgReplace === 'true') {
        label.innerText = field.message
        label.classList.remove(messageValidClass)
        label.classList.add(messageErrorClass)
      }
    }
  }

  validateForm () {
    this.clearPreviousErrors()
    const formData = this.formToObject()
    return new Promise((resolve, reject) => {
      this.validator.validate(formData, { firstFields: true }).then(() => {
        resolve(new FormData(this.form))
      }).catch(({ errors, fields }) => {
        this.handleErrors(errors, fields)
        reject(errors, fields)
      })
    })
  }

  clearErrors (field) {
    if (field.classList.contains(inputErrorClass)) {
      field.classList.remove(inputErrorClass)
    }
    if (!field.classList.contains(inputValidClass)) {
      field.classList.add(inputValidClass)
    }

    var label = this.form.querySelector(`[data-valmsg-for="${field.name}"]`)

    if (label && label.dataset.valmsgReplace === 'true') {
      label.innerText = ''
      if (!label.classList.contains(messageErrorClass)) {
        label.classList.add(messageErrorClass)
      }
      if (label.classList.contains(messageErrorClass)) {
        label.classList.remove(messageErrorClass)
      }
    }

    if (this.summary) {
      var err = this.summary.querySelector(`data-error-for="${field.name}"`)
      if (err) {
        err.parentNode.removeChild(err)
      }
    }
  }

  validateField (field) {
    const formData = this.formToObject()
    return this.validator.validate(formData, { firstFields: true }).then(() => {
      this.clearErrors(field)
      return true
    }).catch(({ errors, fields }) => {
      this.handleFieldError(errors, fields, field)
      return false
    })
  }

  formToObject () {
    var formData = new FormData(this.form)
    let object = {}
    formData.forEach((value, key) => {
      if (key === '') {
        return
      }

      if (!Reflect.has(object, key)) {
        object[key] = value
        return
      }
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]]
      }
      object[key].push(value)
    })

    return object
  }
}
