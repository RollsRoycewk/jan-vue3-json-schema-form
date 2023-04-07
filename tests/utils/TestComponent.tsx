import { defineComponent, PropType } from 'vue'
import JSONSchemaForm, { Schema, ThemeProvider } from '../../lib'
import defauleTheme from '../../lib/theme-default'

// 目前是直接引入ThemeProvider,defauleTheme 更好的做法如下
// vjsf-themedefault  然后通过import { ThemeProvider } from "vue3-jsonschema-form"
// vue3-jsonschema-form

export const ThemeDefaultProvider = defineComponent({
  setup(p, { slots }) {
    return () => (
      <ThemeProvider theme={defauleTheme as any}>
        {slots.default && slots.default()}
      </ThemeProvider>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
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
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <JSONSchemaForm {...props} />
      </ThemeDefaultProvider>
    )
  },
})
