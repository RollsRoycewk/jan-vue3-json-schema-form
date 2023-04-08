import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { withFormItem } from './FormItem'

// const TextWidget: CommonWidgetDefine = defineComponent({
const TextWidget = withFormItem(
  defineComponent({
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

        return <input type="text" value={value} onInput={handleChange} />
      }
    },
  }),
)

export default TextWidget
