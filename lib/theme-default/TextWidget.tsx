import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import FormItem from './FormItem'

// const TextWidget: CommonWidgetDefine = defineComponent({
const TextWidget = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      props.onChange(value)
      //   e.target.value = props.value
      //   props.onChange(e.target.value)
    }

    return () => {
      const { value } = props

      return (
        <FormItem {...props}>
          <input type="text" value={value} onInput={handleChange} />
        </FormItem>
      )
    }
  },
})

export default TextWidget
