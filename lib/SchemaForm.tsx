import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import { Schema, Theme } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { ErrorSchema, validateFormData } from './validator'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
}

const defaultAjvOptions: Options = {
  allErrors: true,
}

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
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
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

    // 校验结果每次都会重新生成
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    // 因为props.ajvOptions是会变化的
    const validatorRef: Ref<Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              // const valid = validatorRef.value.validate(
              //   props.schema,
              //   props.value,
              // ) as boolean
              // const result = validateFormData(
              //   validatorRef.value,
              //   props.value,
              //   props.schema,
              //   props.locale,
              //   props.customValidate,
              // )
              // errorSchemaRef.value = result.errorSchema
              // return new Promise((resolve) => {
              //   validateResolveRef.value = resolve
              //   doValidate()
              // })
              // return result

              return {
                errors: [],
                valid: false,
              }
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

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
          errorSchema={errorSchemaRef.value || {}}
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
        />
      )
    }
  },
})
