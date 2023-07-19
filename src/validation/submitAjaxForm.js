const parseHTML = function (str) {
  const tmp = document.implementation.createHTMLDocument()
  tmp.body.innerHTML = str
  return tmp.body.children
}

const updateContents = function (mode, cssElem, content) {
  const elem = document.querySelector(cssElem)
  const lowerMode = mode.toLowerCase()
  const html = parseHTML(content)
  switch (lowerMode) {
    case 'before':
      for (const content of html.length) {
        elem.insertBefore(content, elem.firstChild)
      }
      break

    case 'after':
      for (const content of html.length) {
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

  if (elem && !isElementInViewport(elem)) {
    window.setTimeout(() => {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }, 200)
  }

  elem.parentNode.dispatchEvent(new CustomEvent('form-updated', { bubbles: true }))
}

const redirect = function (responseData) {
  if (responseData.redirectTo) {
    window.location.href = responseData.redirectTo;
  }
}

export const submitAjaxForm = function (form) {
  const submit = form.querySelector('[type="submit"]')
  if (submit != null) {
    submit.disabled = true
  }

  const mode = form.dataset.ajaxMode || 'replace'
  const update = form.dataset.ajaxUpdate
  const formData = new FormData(form)

  const fetchOptions = {
    method: form.method,
    credentials: 'same-origin',
    cache: 'no-cache',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  const isJsonResponse = function (response) {

    if (response.headers) {
      const contentType = response.headers.get('Content-Type')

      if (contentType && contentType.startsWith('application/json')) {
        return true
      }
    }

    return false
  }

  let responseJson = false
  return fetch(form.action, fetchOptions)
    .then(response =>  {
      if (isJsonResponse(response)) {
        responseJson = true
        return response.json()
      }
      return response.text()
    })
    .then(data => {
      if (responseJson === true) {
        redirect(data);
      } else {
        updateContents(mode, update, data);
      }
    })
    .catch(err => {
      console.error('Ajax form submission error:', err)
      if (submit != null) {
        submit.disabled = false
      }
    })
}

const isElementInViewport = function (el) {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}