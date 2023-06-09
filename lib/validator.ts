import Ajv from 'ajv'
import i18n from 'ajv-i18n'
import { Schema } from './types'
import toPath from 'lodash.topath'
import { isObject } from './utils'

// interface transformErrorObject {
//   name: string
//   property: string
//   message: string
//   params: any
//   schemaPath: string
// }

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}
export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}

function toErrorSchema(errors) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    // toPath => 将a/b/c/d 装换成 [a, b, c, d]
    const path = toPath(property)
    let parent = errorSchema

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        // parent.__errors = [message]

        // instancePath:""
        // keyword:"type"
        // message:"应当是 string 类型"
        // params:{type: 'string'}
        // schemaPath:"#/type
        parent.__errors = [message.message]
      }
    }
    return errorSchema
  }, {})
}

function transformErrors(errors) {
  if (errors === null || errors === undefined) return []

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return errors!.map((message, dataPath, keyword, params, schemaPath) => {
    return {
      name: keyword,
      property: `${dataPath}`,
      message,
      params,
      schemaPath,
    }
  })
}

export async function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale: string,
  customValidate?: (data: any, errors: any) => void,
) {
  let validationError: any = null

  try {
    validator.validate(schema, formData)
  } catch (error) {
    validationError = error
  }

  i18n[locale](validator.errors)
  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message,
      },
    ]
  }

  const errorSchema = toErrorSchema(errors)

  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0,
    }
  }

  const proxy = createErrorProxy()
  await customValidate(formData, proxy)
  const newErrorSchema = mergeObjects(errorSchema, proxy, true)

  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0,
  }
}

function createErrorProxy() {
  const raw = {}
  return new Proxy(raw, {
    get(target, key, reciver) {
      if (key === 'addError') {
        // 返回一个addError方法
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', reciver)
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          } else {
            ;(target as any).__errors = [msg]
          }
        }
      }
      const res = Reflect.get(target, key, reciver)
      if (res === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }

      return res
    },
  })
}

export function mergeObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects.
  const acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays)
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}
