import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import { createUseStyles } from 'vue-jss'

const useStatyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20,
  },
})

export default defineComponent({
  name: 'FormItem',

  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const calssesRef = useStatyles()

    return () => {
      const { schema, errors } = props
      const classes = calssesRef.value

      console.log('errors455451', props)

      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}111</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((err) => {
              ;<li>{err}</li>
            })}
          </ul>
        </div>
      )
    }
  },
})
