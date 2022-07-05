<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Order list')
</script>

<template>
  <div><DatatableV1 /></div>
</template>
