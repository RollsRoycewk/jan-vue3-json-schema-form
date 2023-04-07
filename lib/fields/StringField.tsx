import { defineComponent } from 'vue'
import { FiledPropsDefine, CommonWidgetsNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      console.log('eeeeee', v)

      // const value = e.target.value

      props.onChange(v)

      // props.onChange(v) 关闭后

      // TextWidget.tsx
      //   e.target.value = props.value
      //   props.onChange(e.target.value)

      // 此页面handleChange
      // const value = e.target.value
      // props.onChange(value)
    }

    const TextWidgetRef = getWidget(CommonWidgetsNames.TextWidget)

    return () => {
      const { schema, rootSchema, errorSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value

      return (
        <TextWidget
          {...rest}
          errors={errorSchema.__errors}
          onChange={handleChange}
        />
      )
    }
    // return () => {
    //   const { value } = props
    //   return <input type="text" value={value} onInput={handleChange} />
    // }
  },
})
