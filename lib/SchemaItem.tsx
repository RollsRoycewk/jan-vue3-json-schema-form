import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'

export default defineComponent({
  name: 'SchemaItem',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup() {
    return (props) => {
      const { schema } = props

      // TODO:如果type没有指定,我们可以猜测这个type
      const type = schema.type
      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} is not suppopted`)
        }
      }

      return <Component {...props} schema={schema} />
    }
  },
})
