<script lang="ts">
import 'simple-datatables/src/style.css'
</script>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { debouncedWatch } from '@vueuse/shared'
import type { IDetails, IHeader } from '/@src/models/table'

interface ITableProps {
  data: IDetails[]
  headers: IHeader[]
  totalRows?: Array<number>
  searchType: Array<any>
  isLoading: boolean
  resetChecked?: boolean
  branch: Array<any>
}

const props = withDefaults(defineProps<ITableProps>(), {
  data: () => [],
  headers: () => [],
  totalRows: () => [],
  searchType: () => [],
  resetChecked: false,
  branch: () => [],
})

const emit = defineEmits([
  'update',
  'search',
  'type',
  'sort',
  'remove',
  'status',
  'dropdownValues',
])

const storage = useStorage('/product/inventory/branch', { branch: 0, rows: 0 })
const isOpen = ref(false)
const isConfig = ref(false)
const branchId = ref(0)
const sortException = [4]
const type = ref()
const search = ref('')
const rowCount = ref(0)
const checkAll = ref(false)
const checked = ref<Array<number>>([])
const title = ref('')
const modal = reactive({
  quantity_warn: 0,
  quantity: 0,
  price: 0,
  id: 0,
})

const onCheckAll = () => {
  checked.value.length = 0
  if (!checkAll.value) {
    for (let i in props.data) {
      checked.value.push(props.data[i].id)
    }
  }
}

const reset = () => {
  checked.value.length = 0
  checkAll.value = false
}

const isLoadState = computed(() => props.isLoading)
const isReset = ref(() => {
  return props.resetChecked
})

const onHeaderEmit = (header: IHeader, index: number) => {
  !sortException.includes(index)
    ? emit(
        'sort',
        header.name === 'Active'
          ? 'Is Active'
          : header.name === 'Line 1'
          ? 'Address Line 1'
          : header.name
      )
    : null
}

const onEditConfig = (id: number, name: string) => {
  isConfig.value = true
  title.value = name
  const item: IDetails = props.data.find((x) => x.id === id)!
  modal.id = item.id
  modal.price = item.price
  modal.quantity = item.quantity
  modal.quantity_warn = item.quantity_warn
}

const onGetBranchItems = (id: number) => {
  storage.value.branch = id
  emit('dropdownValues', { id: id, row: rowCount.value })
}

const onSetRows = (count: number) => {
  storage.value.rows = count
  emit('dropdownValues', { id: branchId.value, row: count })
}

const onStatus = (data: any) => {
  emit('status', data)
}

const onRemove = (checked: Array<number>) => {
  emit('remove', checked),
    (checkAll.value = false),
    (checked.length = 0),
    (isOpen.value = false)
}

const onUpdate = () => {
  isConfig.value = false
  emit('update', modal)
}

watch(isReset.value, (current, prev) => {
  reset()
})

watchEffect(() => {
  if (props.branch.length > 0) {
    storage.value.branch === 0
      ? (branchId.value = props.branch[0].value)
      : (branchId.value = storage.value.branch)

    emit('dropdownValues', { id: branchId.value, row: rowCount.value })
  }
})

debouncedWatch(
  search,
  () => {
    emit('search', search.value)
    reset()
  },
  { debounce: 700 }
)

onMounted(() => {
  storage.value.rows > 0
    ? (rowCount.value = storage.value.rows)
    : (rowCount.value = props.totalRows[0])

  type.value = props.searchType[0]
})
</script>

<template>
  <div ref="wrapperElement" class="table-wrapper">
    <!-- Header -->
    <div class="table-header">
      <div class="group-left is-pulled-left">
        <div class="table-rowDropdown mr-3">
          <label>
            <select
              v-model="branchId"
              class="table-selectOption"
              @blur="onGetBranchItems(branchId)"
            >
              <option
                v-for="(number, index) in props.branch"
                :key="index"
                :value="number.value"
              >
                {{ number.label }}
              </option>
            </select>
            Branch
          </label>
        </div>
        <div class="table-rowDropdown mr-3">
          <label>
            <select
              v-model="rowCount"
              class="table-selectOption"
              @blur="onSetRows(rowCount)"
            >
              <option
                v-for="(number, index) in props.totalRows"
                :key="index"
                :value="number"
              >
                {{ number }}
              </option>
            </select>
            Total Rows
          </label>
        </div>
        <div class="table-btnRemove">
          <transition name="fade">
            <VButton
              v-if="checked.length > 0"
              color="danger"
              raised
              @click="isOpen = true"
            >
              Remove
            </VButton>
          </transition>
        </div>
      </div>
      <div class="group-right is-pulled-right">
        <div class="table-searchType mr-3">
          <label>
            <select v-model="type" class="table-searchOption" @click="emit('type', type)">
              <option v-for="(opt, index) in props.searchType" :key="index" :value="opt">
                {{ opt }}
              </option>
            </select>
            Type
          </label>
        </div>
        <div class="table-search">
          <input
            v-model="search"
            type="text"
            class="table-searchInput"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="table-body">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th scope="col" data-sortable="false">
              <VControl>
                <label class="checkbox is-primary is-outlined is-circle">
                  <input
                    id="head-checkbox"
                    v-model="checkAll"
                    :value="true"
                    type="checkbox"
                    @click="onCheckAll"
                  />
                  <span></span>
                </label>
              </VControl>
            </th>
            <template v-for="(header, index) in props.headers" :key="index">
              <th scope="col" @click="onHeaderEmit(header, index)">
                <div
                  v-if="header.name === 'Action'"
                  class="dark-inverted is-flex is-justify-content-flex-end"
                >
                  <a href="#" class="table-sorter px-6"> {{ header.name }} </a>
                </div>
                <a v-else href="#" class="table-sorter"> {{ header.name }} </a>
              </th>
            </template>
          </tr>
        </thead>
        <tbody v-if="data && data.length > 0 && isLoadState === false">
          <tr v-for="(row, index) in data" :key="index">
            <td>
              <VControl>
                <label class="checkbox is-primary is-outlined is-circle">
                  <input
                    :id="`row-checkbox-${index}`"
                    v-model="checked"
                    :value="row.id"
                    type="checkbox"
                  />
                  <span></span>
                </label>
              </VControl>
            </td>
            <td>
              <span class="light-text">
                <VTag
                  :color="row.is_active === 1 ? 'green' : 'danger'"
                  :label="row.is_active === 1 ? 'Active' : 'Inactive'"
                  rounded
                />
              </span>
            </td>
            <td>
              <span class="has-text-weight-semibold has-text-primary">
                {{ row.name }}
              </span>
            </td>
            <td>
              <span
                class="light-text"
                :class="{
                  'has-text-danger': row.quantity! < row.quantity_warn!,
                }"
                >{{ row.quantity }}</span
              >
            </td>
            <td>
              <span class="light-text">{{ row.price }}</span>
            </td>
            <td class="is-end">
              <div class="is-flex is-justify-content-flex-end">
                <ItemsPerBranchDropdown
                  :id="row.id"
                  :is-active="row.is_active"
                  @status="onStatus($event)"
                  @edit="onEditConfig($event, row.name)"
                />
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="12">
              <VLoader
                size="large"
                class="project-preview-wrapper"
                :active="isLoading"
                :lighter="true"
              >
                <VPlaceholderSection
                  title="No data to show"
                  subtitle="There is currently no data to show in this list."
                >
                  <template #image>
                    <img
                      class="light-image"
                      src="/@src/assets/illustrations/placeholders/search-4.svg"
                      alt=""
                    />
                    <img
                      class="dark-image"
                      src="/@src/assets/illustrations/placeholders/search-4-dark.svg"
                      alt=""
                    />
                  </template>
                </VPlaceholderSection>
              </VLoader>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="table-footer">
      <slot></slot>
    </div>

    <!-- Modal -->
    <VModal
      :open="isOpen"
      size="small"
      actions="center"
      noscroll
      noclose
      title="Confirmation"
      @close="isOpen = false"
    >
      <template #content>
        <VPlaceholderSection
          title="Warning"
          subtitle="Do you want to delete the selected fields?"
        />
      </template>
      <template #action>
        <VButton color="danger" raised @click="onRemove(checked)"> Confirm </VButton>
      </template>
    </VModal>

    <!-- Modal -->
    <VModal
      :open="isConfig"
      size="medium"
      actions="right"
      noscroll
      noclose
      :title="title"
      title-color="primary"
      @close="isConfig = false"
    >
      <template #content>
        <form class="modal-form">
          <div class="columns is-multiline">
            <div class="column is-6">
              <div class="field">
                <label for="" class="label">Quantity </label>
                <div class="control">
                  <input
                    v-model="modal.quantity"
                    type="number"
                    class="input"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label for="" class="label">Quantity Warning</label>
                <div class="control">
                  <input
                    v-model="modal.quantity_warn"
                    type="number"
                    class="input"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label for="" class="label">Price</label>
                <div class="control">
                  <input
                    v-model="modal.price"
                    type="number"
                    class="input"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </template>
      <template #action>
        <VButton color="primary" @click="onUpdate()">Save</VButton>
      </template>
    </VModal>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  margin-bottom: 20px;
  padding-left: 0;
  padding-right: 0;

  .group-left {
    display: inline-flex;

    .table-rowDropdown {
      .table-selectOption {
        color: var(--dark-text);
        height: 38px;
        transition: box-shadow 0.3s;
        outline: none;
        padding: 6px;
        border: 1 px solid var(--border);
        border-radius: 0.5rem;
      }
    }
  }

  .group-right {
    display: inline-flex;

    .table-searchInput,
    .table-searchOption {
      padding: 6px 12px;
      color: var(--dark-text);
      font-family: var(--font);
      font-size: 1rem;
      border: 1 px solid var(--border);
      border-radius: 0.5rem;
      height: 38px;
      outline: none;
      transition: box-shadow 0.3s;
    }
  }
}

.table-body {
  .table {
    th {
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--dark-dark-text);
      vertical-align: middle;
      text-align: left;

      a.table-sorter {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}

.table-header::after,
.table-footer::after {
  clear: both;
  content: ' ';
  display: table;
}

/******* Dark Mode *******/
.is-dark {
  .table {
    border-color: var(--dark-sidebar-light-12);
  }

  .table-searchOption,
  .table-searchInput,
  .table-selectOption {
    color: var(--white);
    background: var(--dark-sidebar-light-6);
  }
}

/******* Animation *******/
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
