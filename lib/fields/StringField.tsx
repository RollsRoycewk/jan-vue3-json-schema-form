import { computed, defineComponent } from 'vue'
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

    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetsNames.TextWidget, props.uiSchema)
      return widgetRef.value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      const { rootSchema, errorSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value

      return (
        <TextWidget
          errors={errorSchema.__errors}
          {...rest}
          onChange={handleChange}
          options={widgetOptionsRef.value}
        />
      )
    }
    // return () => {
    //   const { value } = props
    //   return <input type="text" value={value} onInput={handleChange} />
    // }
  },
})
