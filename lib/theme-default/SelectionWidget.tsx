import { defineComponent, PropType, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

export default withFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
    setup(props) {
      const currentValueRef = ref(props.value)

      watch(currentValueRef, (newv, oldv) => {
        if (newv !== props.value) {
          props.onChange(newv)
        }
      })

      watch(
        () => props.value,
        (v) => {
          if (v !== currentValueRef.value) {
            currentValueRef.value = v
          }
        },
      )

      return () => {
        const { options } = props
        return (
          <select multiple={true} v-model={currentValueRef.value}>
            {options.map(({ key, value }) => (
              <option value={value}>{key}</option>
            ))}
          </select>
        )
      }
    },
  }),
)
