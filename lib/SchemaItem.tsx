import { defineComponent } from 'vue'
import { SchemaTypes, FiledPropsDefine } from './types'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
// import NumberField from './fields/NumberField'
import NumberField from './fields/NumberField.vue'

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
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
