import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  provide,
  ref,
} from 'vue'
import {
  Theme,
  SelectionWidgetNames,
  CommonWidgetsNames,
  UISchema,
  CommonWidgetDefine,
} from './types'
import { isObject } from './utils'

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

export function getWidget<T extends SelectionWidgetNames | CommonWidgetsNames>(
  name: T,
  uiSchame?: UISchema,
) {
  if (uiSchame?.widget && isObject(uiSchame.widget)) {
    return ref(uiSchame.widget as CommonWidgetDefine)
  }

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
