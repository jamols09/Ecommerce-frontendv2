<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useItem } from '/@src/composable/api/useItem'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Product list')

const api = useItem()
const table = reactive({
  searchType: ['Name', 'Sku'],
  totalRows: [10, 15, 30, 50],
  headers: [
    { name: 'Discountable' },
    { name: 'Name' },
    { name: 'SKU' },
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
const rows = table.totalRows.sort((a, b) => a - b)
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
  console.log(e)
  // await api.remove({ id: e })
  // page.value = 1
  // onCallTable()
}

const onSort = (e?: any) => {
  table.order = table.order === '' ? '-' : ''
  table.column = e?.toLocaleLowerCase().replace(/ /g, '_')
  onCallTable()
}

const onSetStatus = async (e: any) => {
  await api.status({ id: e.id, state: e.state })
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
    <ItemTable
      :total-rows="rows"
      :headers="table.headers"
      :data="table.data"
      :search-type="table.searchType"
      :is-loading="api.isLoading.value"
      :reset-checked="reset"
      @set-status="onSetStatus($event)"
      @remove="onRemove($event)"
      @row-count="rowCount = $event"
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
    </ItemTable>
  </div>
</template>
