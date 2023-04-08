import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'

// const TextWidget: CommonWidgetDefine = defineComponent({
const PasswordWiget = withFormItem(
  defineComponent({
    name: 'PasswordWiget',
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

        return <input type="password" value={value} onInput={handleChange} />
      }
    },
  }),
)

export default PasswordWiget
