import { defineComponent } from 'vue'
import { FiledPropsDefine } from './types'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup() {
    return () => {
      return <div>Object Field</div>
    }
  },
})
