<script lang="ts">
import 'simple-datatables/src/style.css'
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { debouncedWatch } from '@vueuse/shared'
import type { IData, IHeader } from '/@src/models/table'
import { useStorage } from '@vueuse/core'

interface ITableProps {
  headers: IHeader[]
  totalRows?: Array<number>
  data: IData[]
  searchType: Array<any>
  isLoading: boolean
  resetChecked?: boolean
}

const props = withDefaults(defineProps<ITableProps>(), {
  headers: () => [],
  totalRows: () => [],
  data: () => [],
  searchType: () => [],
  resetChecked: false,
})

const emit = defineEmits([
  'search',
  'rowCount',
  'type',
  'sort',
  'remove',
  'activate',
  'deactivate',
])

const storage = useStorage('/people/customers/list', { rows: 0 })
const isOpen = ref(false)
const sortException = [0, 8]
const type = ref()
const search = ref()
const rowCount = ref(0)
const checkAll = ref<boolean>(false)
const checked = ref<Array<number>>([])
const isLoadState = computed(() => props.isLoading)
const isReset = ref(() => {
  return props.resetChecked
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

const onHeaderEmit = (header: IHeader, index: number) => {
  !sortException.includes(index)
    ? emit('sort', header.name === 'Active' ? 'Is Active' : header.name)
    : null
}

const onSetRows = (count: number) => {
  storage.value.rows = count
  emit('rowCount', count)
}

watch(isReset.value, (current, prev) => {
  reset()
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
  emit('rowCount', rowCount.value)
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
              v-model="rowCount"
              class="table-selectOption"
              @change="onSetRows(rowCount)"
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
            <select
              v-model="type"
              class="table-searchOption"
              @click="emit('type', type)"
            >
              <option
                v-for="(opt, index) in props.searchType"
                :key="index"
                :value="opt"
              >
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
                <a href="#" class="table-sorter"> {{ header.name }} </a>
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
            <td class="is-media">
              <VAvatar v-if="row.thumbnail" picture="{{row.thumbnail}}" />
              <VAvatar v-else picture="/demo/avatars/8.gif" />
            </td>
            <td>
              <VTag
                :color="row.is_active ? 'green' : 'danger'"
                :label="row.is_active ? 'Active' : 'Inactive'"
                rounded
              />
            </td>
            <td>
              <span class="light-text">{{ row.username }}</span>
            </td>
            <td>
              <span class="light-text">{{ row.first_name }}</span>
            </td>
            <td>
              <span class="light-text">{{ row.middle_name }}</span>
            </td>
            <td>
              <span class="light-text">{{ row.last_name }}</span>
            </td>
            <td>
              <span class="light-text">{{ row.email }}</span>
            </td>

            <td>
              <span class="light-text">{{ row.created_at }}</span>
            </td>

            <td>
              <GenericActionDropdown
                edit-route="/app/people/customers/"
                :action-id="row.id"
                :message-remove="row.is_active ? 'Deactivate' : 'Activate'"
                title-edit="Edit"
                message-edit="Edit customer account"
                @click="reset()"
                @remove="
                  emit(
                    row.is_active ? 'deactivate' : 'activate',
                    (checked = $event)
                  ),
                    reset()
                "
              />
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
        <VButton
          color="danger"
          raised
          @click="
            emit('remove', checked),
              (checkAll = false),
              (checked.length = 0),
              (isOpen = false)
          "
          >Confirm</VButton
        >
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
