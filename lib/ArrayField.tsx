import { defineComponent } from 'vue'
import { FiledPropsDefine } from './types'
import { useVJSFContent } from './context'

export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContent()

    return () => {
      const { schema } = props
      const SchemaItem = context.SchemaItem
      return null
    }
  },
})
