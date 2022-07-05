<script setup lang="ts">
import { computed } from 'vue'
import type { ILinksUri, IMeta } from '/@src/models/table'

interface IPagination {
  links: ILinksUri
  meta: IMeta
}

interface IPaginationProps {
  isLoading: boolean
  pagination: IPagination
}

const props = withDefaults(defineProps<IPaginationProps>(), {
  isLoading: false,
})

const linksList = computed(() => {
  if (props.pagination.meta.links.length > 1) {
    return props.pagination.meta.links.slice(1, -1)
  } else {
    return props.pagination.meta.links
  }
})
const isLoadState = computed(() => props.isLoading)
const emit = defineEmits(['change', 'setLink'])
</script>

<template>
  <div class="dataTable-info">
    Showing {{ props.pagination.meta.from }} to {{ props.pagination.meta.to }} of
    {{ props.pagination.meta.total }} result
  </div>
  <nav
    class="flex-pagination pagination is-rounded"
    role="navigation"
    aria-label="pagination"
    data-filter-hide
  >
    <!-- Previous Btn -->
    <a
      v-if="props.pagination.links.prev"
      class="pagination-previous has-chevron"
      @click="isLoadState === false ? emit('change', -1) : false"
      @keypress.space.prevent="isLoadState === false ? emit('change', -1) : false"
    >
      <i aria-hidden="true" class="iconify" data-icon="feather:chevron-left"></i>
    </a>
    <!-- Next Btn -->
    <a
      v-if="props.pagination.links.next"
      :disable="isLoadState"
      class="pagination-next has-chevron"
      @click="isLoadState === false ? emit('change', 1) : false"
      @keypress.space.prevent="isLoadState === false ? emit('change', -1) : false"
    >
      <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right"></i>
    </a>
    <!-- Pages -->
    <ul class="pagination-list">
      <li v-for="page in linksList" :key="page.label">
        <a
          class="pagination-link"
          :aria-current="
            pagination.meta.current_page === +page.label ? 'page' : undefined
          "
          :class="[pagination.meta.current_page === +page.label && 'is-current']"
          @click="
            isLoadState === false && pagination.meta.current_page !== +page.label
              ? emit('setLink', +page.label)
              : false
          "
          @keypress.space.prevent="isLoadState === false ? emit('change', -1) : false"
        >
          {{ page.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
