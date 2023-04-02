const img = require('./assets/logo.png') // eslint-disable-line
import { defineComponent, reactive, ref } from 'vue'
import HelloWorld from './components/HelloWorld'

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} />
}

export default defineComponent({
  setup() {
    const state = reactive({
      name: 'jokcy',
    })

    const numberRef = ref(1)

    // setInterval(() => {
    //   state.name += '1'
    //   numberRef.value += 1
    // }, 1000)

    return () => {
      const number = numberRef.value // 写到外面setup只执行一次数据不会再变化

      return (
        <div id="app">
          <img src={img} alt="Vue logo" />
          <p>{state.name + number}</p>
          <input type="text" v-model={state.name} />
          {renderHelloWorld(123)}
        </div>
      )
    }
  },
})
