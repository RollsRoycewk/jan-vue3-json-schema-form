import { mount } from '@vue/test-utils'
import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()
    // await numberField.props('onChange')('123')  适用于第三方组件,不需要关心底层是怎么实现的
    // 这里input是我们自己写的 所以需要测试
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})
