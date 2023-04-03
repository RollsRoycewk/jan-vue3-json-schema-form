const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
const localize = require('ajv-i18n')
require('ajv-errors')(ajv /*, {singleError: true} */)

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // customkeywprd: true,
      minLength: 10,
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10',
      },
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
      minItems: 2,
      maxItems: 2,
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

// ajv.addKeyword('customkeywprd', {
//   macro() {
//     return {
//       minLength: 10, // 相当于properties - name 里面加上了minLength: 10
//     }
//   },
// })

const validate = ajv.compile(schema)
const valid = validate({
  // customkeywprd: 'wkk',
  name: 'haha',
  age: 18,
  pets: ['string', 10],
  isWorker: true,
})
if (!valid) {
  // localize.zh(validate.errors)
  console.log(validate.errors)
}
