<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { FiledPropsDefine } from '../types'

const props = defineProps(FiledPropsDefine)

const handleChange = (e: any) => {
  const num = +e.target.value
  props.onChange(Number.isNaN(num) ? undefined : num)
}
</script>
