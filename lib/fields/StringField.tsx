import { defineComponent } from 'vue'
import { FiledPropsDefine, CommonWidgetsNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      debugger
      console.log('eeeeee', v)

      // const value = e.target.value

      props.onChange(v)
    }

    const TextWidgetRef = getWidget(CommonWidgetsNames.TextWidget)

    return () => {
      const { schema, rootSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value

      return <TextWidget {...rest} onChange={handleChange} />
    }
    // return () => {
    //   const { value } = props
    //   return <input type="text" value={value} onInput={handleChange} />
    // }
  },
})
