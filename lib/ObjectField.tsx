import { defineComponent, inject } from 'vue'
import { FiledPropsDefine } from './types'
import { SchemaFormContextKey } from './context'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup() {
    const context: any = inject(SchemaFormContextKey)

    console.log('context=========>', context)

    return () => {
      return <div>Object Field</div>
    }
  },
})
