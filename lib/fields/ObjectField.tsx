import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'
import { isObject } from '../utils'
import { useVJSFContent } from '../context'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      // SchemaItem组件 父级结点provide分发过来的
      const context = useVJSFContent()

      const handleObjectFieldChange = (k: string, v: any) => {
        const value: any = isObject(props.value) ? props.value : {}

        if (v === undefined) {
          delete value[k]
        } else {
          value[k] = v
        }

        props.onChange(value)
      }

      const { schema, rootSchema, value } = props

      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  },
})
