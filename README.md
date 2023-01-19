# form-validator
replacement for jquery-validate / jquery-validate-unobtrusive, aimed at dot net projects to remove jquery dependency

## Installation (npm)
```
npm install '@chrisjwarnes/form-validator'

```

## basic usage

```
import { initForms, setupValidation } from '@chrisjwarnes/form-validator'

setupValidation()
initForms()

```

## Adding additional rules

rules use [Async Validation](https://github.com/yiminghe/async-validator) syntax

in order to create a new Rule 

```
import { addRule } from '@chrisjwarnes/form-validator'
```

the addRule function takes two arguments the first is the attribute for the validation, this is in dataset format i.e. for required validation an attribute of `data-val-required` will be added to the input therefore the first argument is `valRequired` as it would appear under the data set property for that input, see [Dataset Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) for more details.

the second argument of addRule is an anonymous function with the argument of a field and returning an object containing the async-validator rule details.

### Example rule
```
addRule('valMaxlength', function (field) {
    return {
      type: 'string',
      max: parseInt(field.dataset.valMaxlengthMax),
      message: field.dataset.valMaxlength
    }
  })
```
