<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { FiledPropsDefine } from '../types'

const props = defineProps(FiledPropsDefine)

const handleChange = (e: any) => {
  props.onChange(e.target.value)
}
</script>
