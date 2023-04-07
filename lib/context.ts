import { inject } from 'vue'
import { CommonFieldType, Theme } from './types'

// 维护所有provide inject key属性
export const SchemaFormContextKey = Symbol()

/**
 * 获取祖先结点提供的内容 SchemaItem 组件
 *
 * @export
 * @returns
 */

export function useVJSFContent() {
  const context:
    | {
        theme: Theme
        SchemaItem: CommonFieldType
      }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaItem should be used')
  }

  return context
}
