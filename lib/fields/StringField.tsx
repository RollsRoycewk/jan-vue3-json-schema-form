import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value

      props.onChange(value)
    }

    return () => {
      const { value } = props
      return <input type="text" value={value} onInput={handleChange} />
    }
  },
})
