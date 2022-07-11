<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useUser } from '/@src/composable/api/useUser'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Category list')

const api = useUser()
const table = reactive({
  searchType: ['Username', 'Created At'],
  totalRows: [10, 15, 30, 50],
  headers: [
    { name: '' },
    { name: 'Active' },
    { name: 'Username' },
    { name: 'First Name' },
    { name: 'Middle Name' },
    { name: 'Last Name' },
    { name: 'Email' },
    { name: 'Created At' },
    { name: 'Action' },
  ],
  data: [],
  order: '',
  column: '',
})

const pagination = ref({
  links: {
    first: '',
    last: '',
    prev: '',
    next: '',
  },
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [{ url: '', label: '', active: false }],
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
})

const rowCount = ref()
const type = ref()
const search = ref()
const page = ref(1)
const reset = ref(false)

const onSearch = (e: any) => {
  search.value = e
  onCallTable()
}

const onChangePage = (e?: any) => {
  if (e.hasOwnProperty('select')) {
    page.value = e.select
  } else {
    e > 0 ? (page.value += 1) : (page.value -= 1)
  }
  reset.value = !reset.value
  onCallTable()
}

const onRemove = async (e?: any) => {
  await api.remove({ id: e })
  page.value = 1
  onCallTable()
}

const onSort = (e: string) => {
  table.order = table.order === '' ? '-' : ''
  table.column = e?.toLocaleLowerCase().replace(/ /g, '_')
  onCallTable()
}

const onSetStatus = async (e: any, a?: string) => {
  await api.status({ id: e, status: a })
  page.value = 1
  onCallTable()
}

const onCallTable = async () => {
  const query = (type.value ?? table.searchType[0]).replace(/ /g, '_').toLocaleLowerCase()

  const sort = (table.order + table.column ?? '' + table.column)
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  await api.table({
    row: rowCount.value ?? table.totalRows[0],
    [`filter[${query}]`]: search.value,
    [`filter[account]`]: 'admin',
    page: page.value ?? '1',
    sort: sort,
  })

  const { data } = api.tableResponse.value
  table.data = data
  pagination.value = api.tableResponse.value
}

watch(rowCount, () => {
  onCallTable()
})

onMounted(() => onCallTable())
</script>

<template>
  <div>
    <EmployeeTable
      :total-rows="
        table.totalRows.sort((a, b) => {
          return a - b
        })
      "
      :headers="table.headers"
      :data="table.data"
      :search-type="table.searchType"
      :is-loading="api.isLoading.value"
      :reset-checked="reset"
      @activate="onSetStatus($event, 'activate')"
      @remove="onRemove($event)"
      @deactivate="onSetStatus($event, 'deactivate')"
      @rowCount="rowCount = $event"
      @type="type = $event"
      @search="onSearch"
      @sort="onSort"
    >
      <VBasicPagination
        :is-loading="api.isLoading.value"
        :pagination="pagination"
        @change="onChangePage"
        @set-link="onChangePage({ select: $event })"
      />
    </EmployeeTable>
  </div>
</template>
