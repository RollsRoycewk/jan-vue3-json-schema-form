import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

// const NumberWidget: CommonWidgetDefine = defineComponent({
const NumberWidget = withFormItem(
  defineComponent({
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value

        const num = Number(value)

        if (Number.isNaN(num)) {
          props.onChange(undefined)
        } else {
          props.onChange(num)
        }
      }

      return () => {
        const { value } = props
        return <input type="number" value={value} onInput={handleChange} />
      }
    },
  }),
)

export default NumberWidget
