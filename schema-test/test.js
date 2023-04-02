const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
require('ajv-formats')(ajv)

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test',
      //   minLength: 10,
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

ajv.addFormat('test', (data) => {
  console.log(data, '------------')
  return data === 'haha'
})

const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 18,
  pets: ['string', 10],
  isWorker: true,
})
if (!valid) console.log(validate.errors)
