import { defineComponent, ref, Ref } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const schema = {
  type: 'string',
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)

    const handleCodeChange = (code: string) => {
      let schema: any

      try {
        schema = JSON.parse(code)
      } catch (err) {
        console.log('JSON.parse(code)', err)
      }

      schemaRef.value = schema
    }

    const classRef = useStyles()
    return () => {
      const classes = classRef.value
      const code = toJson(schemaRef.value)

      return (
        <div>
          <MonacoEditor
            code={code}
            onChange={handleCodeChange}
            title="Schema"
            class={classes.editor}
          />
        </div>
      )
    }
  },
})
