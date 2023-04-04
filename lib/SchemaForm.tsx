import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes } from './types'

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
    },
  },
  setup(props) {
    return () => {
      const schema = props.schema
      const type = schema?.type

      switch (type) {
        case SchemaTypes.STRING: {
          return <input type="text" />
        }
      }

      return <div>This is Form</div>
    }
  },
})
