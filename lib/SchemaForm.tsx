import { defineComponent, PropType, provide } from 'vue'
import { Schema, Theme } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'

export default defineComponent({
  name: 'SchemaForm',
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
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true,
    // },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    // 如果提供的数据会变化,注意使用reactive
    const context: any = {
      SchemaItem,
      // theme: props.theme,
    }
    // 向当前节点后的所有子节点以及叶子结点提供SchemItem组件,相比直接引用组件相互调用减少问题出现
    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
        />
      )
    }
  },
})
