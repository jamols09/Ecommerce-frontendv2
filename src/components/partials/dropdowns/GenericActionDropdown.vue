<script setup lang="ts">
import { ref } from 'vue'

interface IActionDropdown {
  actionId: number
  messageRemove?: string
  titleEdit?: string
  messageEdit?: string
  editRoute: string
}
const props = withDefaults(defineProps<IActionDropdown>(), {
  actionId: 0,
  messageRemove: 'Disable',
  titleEdit: 'Edit',
  messageEdit: 'Edit item',
  editRoute: '',
})
const emit = defineEmits(['remove'])
const action = ref<Array<number>>([])
const onRemove = async (e: number) => {
  action.value.push(e)
  emit('remove', action.value)
}
</script>

<template>
  <VDropdown icon="feather:more-vertical" right spaced>
    <template #content>
      <RouterLink
        :to="{
          path: props.editRoute + props.actionId,
        }"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>{{ props.titleEdit }}</span>
          <span>
            <small>{{ props.messageEdit }}</small>
          </span>
        </div>
      </RouterLink>

      <hr class="dropdown-divider" />

      <a
        href="#"
        role="menuitem"
        class="dropdown-item is-media"
        @click="onRemove(props.actionId)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>{{ props.messageRemove }}</span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
