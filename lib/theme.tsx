import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  provide,
} from 'vue'
import { Theme } from './types'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      require: true,
    },
  },
  setup(props, { slots }) {
    // 保持响应式数据
    const context = computed(() => props.theme)
    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  },
})

export function getWidget(name: string) {
  const context: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)

  if (!context) {
    throw new Error('vjsf theme required')
  }

  // 保持响应式
  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}

export default ThemeProvider
