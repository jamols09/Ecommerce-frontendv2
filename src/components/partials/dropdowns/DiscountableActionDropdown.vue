<script setup lang="ts">
import { ref } from 'vue'

interface IActionDropdown {
  actionId: number
  titleDiscountable: string
  messageDiscountable?: string
  titleEdit?: string
  messageEdit?: string
}
const props = withDefaults(defineProps<IActionDropdown>(), {
  actionId: 0,
  titleDiscountable: '',
  messageDiscountable: '',
  titleEdit: '',
  messageEdit: '',
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
      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>{{ props.titleEdit }}</span>
          <span
            ><small>{{ props.messageEdit }}</small></span
          >
        </div>
      </a>

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
          <span>
            {{ props.titleDiscountable }}
          </span>
          <span>
            <small>{{ props.messageDiscountable }}</small>
          </span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
