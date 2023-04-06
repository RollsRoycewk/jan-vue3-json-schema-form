import { shallowMount } from '@vue/test-utils'
import { defineComponent, h, resolveComponent } from 'vue'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  },
})

describe('HelloWorld.vue', () => {
  beforeEach(() => {
    console.log('before each')
  })

  afterEach(() => {
    console.log('after each')
  })

  beforeAll(() => {
    console.log('before all')
  })

  afterAll(() => {
    console.log('after all')
  })

  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })

    // await wrapper.setProps({
    //   msg: '123',
    // })

    // expect(wrapper.text()).toEqual('123') 通过

    wrapper.setProps({
      msg: '123',
    })

    expect(wrapper.text()).toEqual('123')
  })

  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('another', () => {
  beforeEach(() => {
    console.log('before each11111')
  })

  afterEach(() => {
    console.log('after each1111')
  })

  beforeAll(() => {
    console.log('before all1111')
  })

  afterAll(() => {
    console.log('after all111')
  })

  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})
