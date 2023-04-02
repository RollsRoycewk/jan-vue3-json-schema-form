import { defineComponent } from 'vue'

const PropsType = {
  // msg: String,
  age: {
    type: Number,
    required: true,
  },
} as const

export default defineComponent({
  name: 'HelloWorld',
  props: PropsType,
  mounted() {
    // this.age // (property) age: number   ok
  },

  setup(props) {
    return () => <div>{props.age}</div>
  },
})
