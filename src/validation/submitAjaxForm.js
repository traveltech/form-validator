
const ie11 = typeof (document.documentMode) !== 'undefined'

const parseHTML = function (str) {
  logger.log('parsing response html')
  const tmp = document.implementation.createHTMLDocument()
  tmp.body.innerHTML = str
  return tmp.body.children
}

const updateContents = function (mode, cssElem, content) {
  const elem = document.querySelector(cssElem)
  const lowerMode = mode.toLowerCase()
  switch (lowerMode) {
    case 'before':
      const html = parseHTML(content)
      for (const content of html.length) {
        elem.insertBefore(content, elem.firstChild)
      }
      break

    case 'after':
      var html2 = parseHTML(content)
      for (const content of html2.length) {
        elem.appendChild(content)
      }
      break

    case 'replace-with':
      elem.outerHTML = content
      break

    default:
      elem.innerHTML = content
      break
  }

  if (!isElementInViewport(elem)) {
    window.setTimeout(() => {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }, 200)
  }

  elem.parentNode.dispatchEvent(new CustomEvent('form-updated', { bubbles: true }))
}

export const submitAjaxForm = function (form) {
  const submit = form.querySelector('[type="submit"]')
  if (submit != null) {
    submit.disabled = true
  }

  const mode = form.dataset.ajaxMode || 'replace'
  const update = form.dataset.ajaxUpdate
  const formData = new FormData(form)

  let fetchOptions = {
    method: form.method,
    credentials: 'same-origin',
    cache: 'no-cache',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  if (ie11) {
    const formParams = new URLSearchParams(formData)
    fetchOptions.body = formParams
    fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  return fetch(form.action, fetchOptions)
    .then(response => response.text())
    .then(data => {
      updateContents(mode, update, data)
    })
    .catch(err => {
      if (submit != null) {
        submit.disabled = false
      }
    })
}

const isElementInViewport = function (el) {
  var rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}