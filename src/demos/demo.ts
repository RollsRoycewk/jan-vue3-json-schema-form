import PasswordWiget from '../components/PasswordWiget'

export default {
  name: 'Demo',
  schema: {
    // type: 'number',
    // minLength: 10,
    // title: 'demo',
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 'retrypassword',
      },
    },
  },
  async customValidata(data: any, errors: any) {
    // if (data.pass1 !== data.pass2) {
    //   errors.pass2.addError('密码必须相同')
    // }
    return new Promise((reslove) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        reslove({})
      }, 2000)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWiget,
        color: 'red',
      },
      pass2: {
        color: 'red',
      },
    },
  },
  default: 1,
}
