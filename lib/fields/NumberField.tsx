import { FiledPropsDefine, CommonWidgetsNames } from '../types'
import { defineComponent } from 'vue'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      const num = Number(v)

      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }

    const NumberWidgetRef = getWidget(CommonWidgetsNames.NumberWidget)

    return () => {
      const { rootSchema, errorSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value

      return (
        <NumberWidget
          {...rest}
          errors={errorSchema.__errors}
          onChange={handleChange}
        />
      )
      // return <input type="number" value={value} onInput={handleChange} />
    }
  },
})
