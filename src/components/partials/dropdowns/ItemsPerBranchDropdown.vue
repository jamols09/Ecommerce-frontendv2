<script setup lang="ts">
interface IActionDropdownProps {
  titleDeactivate?: string
  messageDeactivate?: string
  titleEdit?: string
  messageEdit?: string
  editRoute?: string
  id: number
  isActive: number
}

const props = withDefaults(defineProps<IActionDropdownProps>(), {
  titleDeactivate: 'Deactivate',
  messageDeactivate: 'Change item status',
  titleEdit: 'Edit',
  messageEdit: 'Edit item',
  editRoute: '',
  id: 0,
  isActive: 0,
})

const emit = defineEmits(['remove', 'status', 'status', 'edit'])

// const onRemove = async (e: number) => {
//   action.value.push(e)
//   emit('remove', action.value)
// }

const onEditConfig = (id: number) => {
  emit('edit', id)
}

const onStatus = (id: number) => {
  emit('status', { id: id, is_active: props.isActive === 1 ? 0 : 1 })
}
</script>

<template>
  <VDropdown icon="feather:more-vertical" right spaced>
    <template #content>
      <a
        href="#"
        role="menuitem"
        class="dropdown-item is-media"
        @click="onEditConfig(props.id)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span> Edit </span>
          <span>
            <small>Edit product config</small>
          </span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        href="#"
        role="menuitem"
        class="dropdown-item is-media"
        @click="onStatus(props.id)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>
            {{ props.isActive === 1 ? props.titleDeactivate : 'Activate' }}
          </span>
          <span>
            <small>{{ props.messageDeactivate }}</small>
          </span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
