import { mount } from '@vue/test-utils'
import JsonSchemaForm, { NumberField, StringField } from '../../lib'

describe('ObjectField', () => {
  let schema: any

  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })

  it('should render properties to correct fileds', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: {},
        onChange: (v) => {
          console.log(v)
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  it('should change value when sub fields trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    await strField.props('onChange')('1')

    expect(value.name).toEqual('1')
    await numField.props('onChange')(1)
    expect(value.age).toEqual(1)
    // expect(numField.exists()).toBeTruthy()
  })

  it('should render properties to correct fileds', async () => {
    let value: any = {
      name: '123',
    }
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    await strField.props('onChange')(undefined)

    expect(value.name).toBeUndefined()
  })
})
