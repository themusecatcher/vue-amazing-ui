# 表格 Table

<GlobalElement />

*展示行列数据*

## 何时使用

- 当有大量结构化的数据需要展现时
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时

<script setup lang="ts">
import { ref, reactive, onBeforeMount, watch, watchEffect, h, computed, unref } from 'vue'
import { SmileOutlined, PlusOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import type { TableProps, TableColumn, TableSelection } from 'vue-amazing-ui'
const loading = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const customStyleBordered = ref<boolean>(true)
const sizeBordered = ref<boolean>(true)
const alignBordered = ref<boolean>(true)
const stripedBordered = ref<boolean>(true)
const headerFooterbordered = ref<boolean>(true)
const groupBordered = ref<boolean>(true)
const sortBordered = ref<boolean>(true)
const selectionBordered = ref<boolean>(true)
const queryParams = reactive({
  pageSize: 10,
  page: 1
})
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<TableProps['size']>('middle')
const alignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const align = ref<TableColumn['align']>('center')
const selectionTypeOptions = [
  {
    label: 'Checkbox',
    value: 'checkbox'
  },
  {
    label: 'Radio',
    value: 'radio'
  }
]
const rowSelection = reactive<TableSelection>({
  columnTitle: undefined,
  columnWidth: 100,
  fixed: true,
  hideSelectAll: false,
  type: 'checkbox',
  selectedRowKeys: ['3'],
  onChange: (selectedRowKeys: string[], selectedRows: Record<string, any>[]) => {
    console.log('onChange')
    console.log('selectedRowKeys', selectedRowKeys)
    console.log('selectedRows', selectedRows)
    rowSelection.selectedRowKeys = selectedRowKeys
  },
  onSelect: (
    record: Record<string, any>,
    selected: boolean,
    selectedRows: Record<string, any>[],
    selectedRowKeys: string[]
  ) => {
    console.log('onSelect')
    console.log('record', record)
    console.log('selected', selected)
    console.log('selectedRows', selectedRows)
    console.log('selectedRowKeys', selectedRowKeys)
  },
  onSelectAll: (
    selected: boolean,
    selectedRows: Record<string, any>[],
    changeRows: Record<string, any>[],
    selectedRowKeys: string[],
    changeRowKeys: string[]
  ) => {
    console.log('onSelectAll')
    console.log('selected', selected)
    console.log('selectedRows', selectedRows)
    console.log('changeRows', changeRows)
    console.log('selectedRowKeys', selectedRowKeys)
    console.log('changeRowKeys', changeRowKeys)
  },
  getSelectionProps: (record: Record<string, any>) => ({
    disabled: record.key === '5',
    name: record.name
  })
})
const clear = () => {
  rowSelection.selectedRowKeys = []
}
watchEffect(() => {
  console.log('rowSelection.selectedRowKeys', rowSelection.selectedRowKeys)
})
const columns = reactive<TableColumn[]>([
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: 'Job',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: 'Sex',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: 'Address',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: 'Action',
    width: 150,
    key: 'action'
  }
])
const columnsCustomStyle = reactive<TableColumn[]>([
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', className: 'age' },
  { title: 'Job', dataIndex: 'job' },
  { title: 'Address', dataIndex: 'address' }
])
const columnsSize = reactive<TableColumn[]>([
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' }
])
const columnsAlign = reactive<TableColumn[]>([
  { title: 'Name', align: 'center', dataIndex: 'name' },
  { title: 'Age', align: 'center', dataIndex: 'age' },
  { title: 'Address', align: 'center', dataIndex: 'address' }
])
watch(align, () => {
  columnsAlign.forEach((column: TableColumn) => (column.align = align.value))
})
const columnsStriped = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Job',
    dataIndex: 'job'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
])
const columnsEllipsis = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true
  },
  {
    title: 'Long Header Cell Long Header Cell',
    dataIndex: 'address',
    ellipsis: true
  },
  {
    title: 'Long Header Cell',
    dataIndex: 'address',
    ellipsis: true
  },
  {
    title: 'Long Header Cell',
    dataIndex: 'address',
    ellipsis: true
  }
])
const sharedOnCell = (record: Record<string, any>, index: number) => {
  if (index === 4) {
    return { colSpan: 0 }
  }
}
const columnsMerge = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    customCell: (record: Record<string, any>, index: number) => {
      return {
        colSpan: index < 4 ? 1 : 5
      }
    }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    customCell: sharedOnCell
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    customCell: (record: Record<string, any>, index: number) => {
      if (index === 2) {
        return { rowSpan: 2 }
      }
      // These two are merged into above cell
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    }
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    customCell: (record: Record<string, any>, index: number) => {
      if (index === 1) {
        return { rowSpan: 3 }
      }
      if (index === 2) {
        return { rowSpan: 0 }
      }
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    customCell: sharedOnCell
  }
])
const columnsCellEditable = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
])
const columnsRowEditable = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: '15%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '40%'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
])
const columnsExpandable = reactive<TableColumn[]>([
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', key: 'action' }
])
const columnsFixColumn = reactive<TableColumn[]>([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100
  }
])
const columnsFixHeader = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
])
const columnsFixHeaderAndColumn = reactive<TableColumn[]>([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100
  }
])
const columnsFixHeaderAndScrollbar = reactive<TableColumn[]>([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100
  }
])
const columnsHeaderGroup = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a: Record<string, number>, b: Record<string, number>) => a.age - b.age
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 200
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 200
      }
    ]
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right'
  }
])
const columnsSort = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: Record<string, string>, b: Record<string, string>) => a.name.length - b.name.length,
    sortDirections: ['descend']
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: Record<string, number>, b: Record<string, number>) => a.age - b.age
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a: Record<string, string>, b: Record<string, string>) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend']
  }
])
const columnsSelection = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
])
const dataSource = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    sex: 'boy',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    sex: 'boy',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    sex: 'girl',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    sex: 'boy',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    sex: 'boy',
    address: 'Los Angeles'
  }
])
const dataSourceCustomStyle = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    address: 'Tel Aviv, Israel'
  }
])
const rowClassName = (record: Record<string, any>, rowIndex: number) => {
  if (record.age > 30) {
    return 'older-row'
  } else if (rowIndex % 2 === 1) {
    return 'even-row'
  }
  return ''
}
const dataSourceSize = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    address: 'Tel Aviv, Israel'
  }
])
const dataSourceAlign = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    address: 'Tel Aviv, Israel'
  }
])
const dataSourcesStriped = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    address: 'Los Angeles'
  }
])
const dataSourceMerge = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    tel: '0666-12098909',
    phone: 18889898989,
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    tel: '0666-22098333',
    phone: 18899998888,
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    tel: '0888-32098909',
    phone: 18899998888,
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    tel: '0888-32098909',
    phone: 18899998888,
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Los Angeles'
  }
])
const dataSourceCellEditable = ref([
  {
    key: '0',
    name: 'Edward King 0',
    age: 32,
    address: 'London, Park Lane no. 0'
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: 32,
    address: 'London, Park Lane no. 1'
  },
  {
    key: '2',
    name: 'Edward King 2',
    age: 32,
    address: 'London, Park Lane no. 2'
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceRowEditable = ref<Record<string, any>[]>(data.slice(0, 10))
const dataSourceExpandable = ref([
  {
    key: '1',
    name: 'Superman',
    age: 32,
    address: 'New York No.1 Lake Park',
    description: 'My name is Superman, I am 32 years old, living in New York No.1 Lake Park.'
  },
  {
    key: '2',
    name: 'Spiderman',
    age: 22,
    address: 'London No.2 Lake Park',
    description: 'My name is Spiderman, I am 42 years old, living in London No.2 Lake Park.'
  },
  {
    key: '3',
    name: 'Ironman',
    age: 36,
    address: 'Sidney No.3 Lake Park',
    description: 'My name is Ironman, I am 32 years old, living in Sidney No.3 Lake Park.'
  }
])
const dataSourceFixColumn = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    address: 'Tel Aviv, Israel'
  }
])
const dataSourceFixHeader = ref(data)
const dataSourceFixHeaderAndColumn = ref(data)
const dataSourceFixHeaderAndScrollbar = ref(data)
// 获取 0~10 之间的随机整数
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //加 1 是因为包含 max
}
const dataSourceHeaderGroup = [...Array(100)].map((_, i) => ({
  key: i.toString(),
  name: 'John Brown',
  age: getRandomIntInclusive(0, 10),
  street: 'Lake Park',
  building: 'C' + i,
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLake Co',
  gender: 'M'
}))
const dataSourceSort = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No.1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No.1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No.12 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No.102 Lake Park'
  }
])
const dataSourceSelection = ref(data)
onBeforeMount(() => {
  getData()
})
function getData() {
  loading.value = true
  // 模拟异步请求获取数据
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
function onChange(page: number, pageSize: number) {
  queryParams.page = page
  queryParams.pageSize = pageSize
  getData()
}
const cellEditableData = reactive<Record<string, any>>({})
const handleCellAdd = () => {
  const count = dataSourceCellEditable.value.length
  const newData = {
    key: `${count}`,
    name: `Edward King ${count}`,
    age: 32,
    address: `London, Park Lane no. ${count}`
  }
  dataSourceCellEditable.value.push(newData)
}
const handleCellEdit = (key: string) => {
  cellEditableData[key] = dataSourceCellEditable.value.filter((item) => key === item.key)[0]
}
const handleCellSave = (key: string) => {
  Object.assign(dataSourceCellEditable.value.filter((item) => key === item.key)[0], cellEditableData[key])
  delete cellEditableData[key]
}
const handleCellDelete = (key: string) => {
  dataSourceCellEditable.value = dataSourceCellEditable.value.filter((item) => item.key !== key)
}
const rowEditableData = reactive<Record<string, any>>({})
const handleRowEdit = (key: string) => {
  rowEditableData[key] = dataSourceRowEditable.value.filter((item) => key === item.key)[0]
}
const handleRowSave = (key: string) => {
  Object.assign(dataSourceCellEditable.value.filter((item) => key === item.key)[0], rowEditableData[key])
  delete rowEditableData[key]
}
const handleRowCancel = (key: string) => {
  delete rowEditableData[key]
}
const handleTableChange = (page: number, pageSize: number) => {
  tableLoading.value = true
  setTimeout(() => {
    dataSourceRowEditable.value = data.slice((page - 1) * pageSize, page * pageSize)
    tableLoading.value = false
  }, 500)
}
const expandedRowKeys = ref<TableProps['expandedRowKeys']>(['1'])
watchEffect(() => {
  console.log('expandedRowKeys', expandedRowKeys.value)
})
const handleExpand = (expanded: boolean, record: Record<string, any>) => {
  console.log('expanded', expanded)
  console.log('record', record)
}
const handleExpandedRowsChange = (expandedRows: string[]) => {
  console.log('expandedRowsChange', expandedRows)
}
function onSortChange(column: TableColumn, currentDataSource: Record<string, any>[]) {
  console.log('sort column', column)
  console.log('sort currentDataSource', currentDataSource)
}
</script>

## 基本使用

<Table
  :columns="columns"
  :dataSource="dataSource"
  :pagination="{
    showTotal: true
  }"
  :loading="loading"
  @change="onChange"
>
  <template #headerCell="{ column, title }">
    <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
  </template>
  <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'name'">
      <a> hello {{ record.name }} </a>
    </template>
    <template v-else-if="column.key === 'sex'">
      <Tag v-if="record.sex === 'boy'" color="volcano">{{ record.sex }}</Tag>
      <Tag v-else-if="record.sex === 'girl'" color="magenta">{{ record.sex }}</Tag>
    </template>
    <template v-else-if="column.key === 'action'">
      <span>
        <a>Invite {{ record.name }}</a>
        <Divider vertical />
        <a>Delete</a>
      </span>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import type { TableColumn } from 'vue-amazing-ui'
const loading = ref<boolean>(false)
const queryParams = reactive({
  pageSize: 10,
  page: 1
})
const columns = reactive<TableColumn[]>([
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: 'Job',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: 'Sex',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: 'Address',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: 'Action',
    width: 150,
    key: 'action'
  }
])
const dataSource = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    sex: 'boy',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    sex: 'boy',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    sex: 'girl',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    sex: 'boy',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    sex: 'boy',
    address: 'Los Angeles'
  }
])
onBeforeMount(() => {
  getData()
})
function getData() {
  loading.value = true
  // 模拟异步请求获取数据
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
function onChange(page: number, pageSize: number) {
  queryParams.page = page
  queryParams.pageSize = pageSize
  getData()
}
</script>
<template>
  <Table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="{
      showTotal: true
    }"
    :loading="loading"
    @change="onChange"
  >
    <template #headerCell="{ column, title }">
      <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a> hello {{ record.name }} </a>
      </template>
      <template v-else-if="column.key === 'sex'">
        <Tag v-if="record.sex === 'boy'" color="volcano">{{ record.sex }}</Tag>
        <Tag v-else-if="record.sex === 'girl'" color="magenta">{{ record.sex }}</Tag>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite {{ record.name }}</a>
          <Divider vertical />
          <a>Delete</a>
        </span>
      </template>
    </template>
  </Table>
</template>
```

:::

## 加载中

<Flex vertical>
  <Table :columns="columns" loading />
  <Table :columns="columns" loading :spin-props="{ indicator: 'dynamic-circle' }" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columns = reactive<TableColumn[]>([
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: 'Job',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: 'Sex',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: 'Address',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: 'Action',
    width: 150,
    key: 'action'
  }
])
</script>
<template>
  <Flex vertical>
    <Table :columns="columns" loading />
    <Table :columns="columns" loading :spin-props="{ indicator: 'dynamic-circle' }" />
  </Flex>
</template>
```

:::

## 暂无数据

<Flex vertical>
  <Table :columns="columns" />
  <Table :columns="columns" :empty-props="{ description: 'no data', image: 'filled' }" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columns = reactive<TableColumn[]>([
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: 'Job',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: 'Sex',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: 'Address',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: 'Action',
    width: 150,
    key: 'action'
  }
])
</script>
<template>
  <Flex vertical>
    <Table :columns="columns" />
    <Table :columns="columns" :empty-props="{ description: 'no data', image: 'filled' }" />
  </Flex>
</template>
```

:::

## 带边框

<Table
  :columns="columns"
  :data-source="dataSource"
  :pagination="{
    showTotal: true
  }"
  bordered
>
  <template #headerCell="{ column, title }">
    <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
  </template>
  <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'name'">
      <a> hello {{ record.name }} </a>
    </template>
    <template v-else-if="column.key === 'sex'">
      <Tag v-if="record.sex === 'boy'" color="volcano">{{ record.sex }}</Tag>
      <Tag v-else-if="record.sex === 'girl'" color="magenta">{{ record.sex }}</Tag>
    </template>
    <template v-else-if="column.key === 'action'">
      <span>
        <a>Invite {{ record.name }}</a>
        <Divider vertical />
        <a>Delete</a>
      </span>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import type { TableColumn } from 'vue-amazing-ui'
const columns = reactive<TableColumn[]>([
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: 'Job',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: 'Sex',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: 'Address',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: 'Action',
    width: 150,
    key: 'action'
  }
])
const dataSource = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    sex: 'boy',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    sex: 'boy',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    sex: 'girl',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    sex: 'boy',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    sex: 'boy',
    address: 'Los Angeles'
  }
])
</script>
<template>
  <Table
    :columns="columns"
    :data-source="dataSource"
    :pagination="{
      showTotal: true
    }"
    bordered
  >
    <template #headerCell="{ column, title }">
      <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a> hello {{ record.name }} </a>
      </template>
      <template v-else-if="column.key === 'sex'">
        <Tag v-if="record.sex === 'boy'" color="volcano">{{ record.sex }}</Tag>
        <Tag v-else-if="record.sex === 'girl'" color="magenta">{{ record.sex }}</Tag>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite {{ record.name }}</a>
          <Divider vertical />
          <a>Delete</a>
        </span>
      </template>
    </template>
  </Table>
</template>
```

:::

## 自定义样式

*使用 `rowClassName` 和 `Column.className` 自定义表格样式*

<br/>

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="customStyleBordered" /> </Space>
  <Table
    :columns="columnsCustomStyle"
    :data-source="dataSourceCustomStyle"
    :row-class-name="rowClassName"
    :bordered="customStyleBordered"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const customStyleBordered = ref<boolean>(true)
const columnsCustomStyle = reactive<TableColumn[]>([
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', className: 'age' },
  { title: 'Job', dataIndex: 'job' },
  { title: 'Address', dataIndex: 'address' }
])
const dataSourceCustomStyle = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    address: 'Tel Aviv, Israel'
  }
])
const rowClassName = (record: Record<string, any>, rowIndex: number) => {
  if (record.age > 30) {
    return 'older-row'
  } else if (rowIndex % 2 === 1) {
    return 'even-row'
  }
  return ''
}
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="customStyleBordered" /> </Space>
    <Table
      :columns="columnsCustomStyle"
      :data-source="dataSourceCustomStyle"
      :row-class-name="rowClassName"
      :bordered="customStyleBordered"
    />
  </Flex>
</template>
<style lang="less" scoped>
:deep(.even-row td) {
  color: #1677ff !important;
}
:deep(.age) {
  color: #09c8ce !important;
}
:deep(.older-row .age) {
  color: #eb2f96 !important;
}
</style>
```

:::

## 三种尺寸

*另两种紧凑型的列表；小型列表适用于对话框内*

<br/>

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="sizeBordered" /> </Space>
  <Space align="center"> size: <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" /> </Space>
  <Table :columns="columnsSize" :data-source="dataSourceSize" :bordered="sizeBordered" :size="size" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableProps, TableColumn } from 'vue-amazing-ui'
const sizeBordered = ref<boolean>(true)
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<TableProps['size']>('middle')
const columnsSize = reactive<TableColumn[]>([
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' }
])
const dataSourceSize = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    address: 'Tel Aviv, Israel'
  }
])
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="sizeBordered" /> </Space>
    <Space align="center"> size: <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" /> </Space>
    <Table :columns="columnsSize" :data-source="dataSourceSize" :bordered="sizeBordered" :size="size" />
  </Flex>
</template>
```

:::

## 列对齐方式

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="alignBordered" /> </Space>
  <Space align="center"> align: <Radio :options="alignOptions" v-model:value="align" button button-style="solid" /> </Space>
  <Table :columns="columnsAlign" :data-source="dataSourceAlign" :bordered="alignBordered" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const alignBordered = ref<boolean>(true)
const alignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const align = ref<TableColumn['align']>('center')
const columnsAlign = reactive<TableColumn[]>([
  { title: 'Name', align: 'center', dataIndex: 'name' },
  { title: 'Age', align: 'center', dataIndex: 'age' },
  { title: 'Address', align: 'center', dataIndex: 'address' }
])
watch(align, () => {
  columnsAlign.forEach((column: TableColumn) => (column.align = align.value))
})
const dataSourceAlign = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    address: 'Tel Aviv, Israel'
  }
])
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="alignBordered" /> </Space>
    <Space align="center"> align: <Radio :options="alignOptions" v-model:value="align" button button-style="solid" /> </Space>
    <Table :columns="columnsAlign" :data-source="dataSourceAlign" :bordered="alignBordered" />
  </Flex>
</template>
```

:::

## 斑马条纹

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="stripedBordered" /> </Space>
  <Table :columns="columnsStriped" :data-source="dataSourcesStriped" striped :bordered="stripedBordered" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const stripedBordered = ref<boolean>(true)
const columnsStriped = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Job',
    dataIndex: 'job'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
])
const dataSourcesStriped = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    address: 'Los Angeles'
  }
])
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="stripedBordered" /> </Space>
    <Table :columns="columnsStriped" :data-source="dataSourcesStriped" striped :bordered="stripedBordered" />
  </Flex>
</template>
```

:::

## 页头和页脚

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="headerFooterbordered" /> </Space>
  <Table :columns="columns" :data-source="dataSource" :bordered="headerFooterbordered">
    <template #header> Header firstData name: {{ dataSource[0].name }} </template>
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'name'">
        <a> hello {{ text }} </a>
      </template>
      <template v-else-if="column.key === 'sex'">
        <Tag v-if="text === 'boy'" color="volcano">{{ text }}</Tag>
        <Tag v-else-if="text === 'girl'" color="magenta">{{ text }}</Tag>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite</a>
          <Divider vertical />
          <a>Delete</a>
        </span>
      </template>
    </template>
    <template #footer> Footer lastData name: {{ dataSource[dataSource.length - 1].name }} </template>
  </Table>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const headerFooterbordered = ref<boolean>(true)
const columns = reactive<TableColumn[]>([
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: 'Job',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: 'Sex',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: 'Address',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: 'Action',
    width: 150,
    key: 'action'
  }
])
const dataSource = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    sex: 'boy',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    sex: 'boy',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    sex: 'girl',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    sex: 'boy',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    sex: 'boy',
    address: 'Los Angeles'
  }
])
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="headerFooterbordered" /> </Space>
    <Table :columns="columns" :data-source="dataSource" :bordered="headerFooterbordered">
      <template #header> Header firstData name: {{ dataSource[0].name }} </template>
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'name'">
          <a> hello {{ text }} </a>
        </template>
        <template v-else-if="column.key === 'sex'">
          <Tag v-if="text === 'boy'" color="volcano">{{ text }}</Tag>
          <Tag v-else-if="text === 'girl'" color="magenta">{{ text }}</Tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite</a>
            <Divider vertical />
            <a>Delete</a>
          </span>
        </template>
      </template>
      <template #footer> Footer lastData name: {{ dataSource[dataSource.length - 1].name }} </template>
    </Table>
  </Flex>
</template>
```

:::

## 单元格自动省略

*设置 `column.ellipsis` 可以让单元格内容根据宽度自动省略*

<br/>

<Table :columns="columnsEllipsis" :data-source="dataSource">
  <template #bodyCell="{ column, text }">
    <template v-if="column.dataIndex === 'name'">
      <a>{{ text }}</a>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columnsEllipsis = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true
  },
  {
    title: 'Long Header Cell Long Header Cell',
    dataIndex: 'address',
    ellipsis: true
  },
  {
    title: 'Long Header Cell',
    dataIndex: 'address',
    ellipsis: true
  },
  {
    title: 'Long Header Cell',
    dataIndex: 'address',
    ellipsis: true
  }
])
const dataSource = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    job: 'Player',
    sex: 'boy',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    sex: 'boy',
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    sex: 'girl',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    sex: 'boy',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    sex: 'boy',
    address: 'Los Angeles'
  }
])
</script>
<template>
  <Table :columns="columnsEllipsis" :data-source="dataSource">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </Table>
</template>
```

:::

## 合并单元格

*表头只支持列合并，使用 `column` 里的 `colSpan` 进行设置；表格支持行/列合并，使用 `customCell` 将单元格属性 `colSpan` 或 `rowSpan` 设为 `0` 时，设置的表格不会渲染*

<br/>

<Table :columns="columnsMerge" :data-source="dataSourceMerge" bordered>
  <template #bodyCell="{ column, text }">
    <template v-if="column.dataIndex === 'name'">
      <a href="javascript:;">{{ text }}</a>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const sharedOnCell = (record: Record<string, any>, index: number) => {
  if (index === 4) {
    return { colSpan: 0 }
  }
}
const columnsMerge = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    customCell: (record: Record<string, any>, index: number) => {
      return {
        colSpan: index < 4 ? 1 : 5
      }
    }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    customCell: sharedOnCell
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    customCell: (record: Record<string, any>, index: number) => {
      if (index === 2) {
        return { rowSpan: 2 }
      }
      // These two are merged into above cell
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    }
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    customCell: (record: Record<string, any>, index: number) => {
      if (index === 1) {
        return { rowSpan: 3 }
      }
      if (index === 2) {
        return { rowSpan: 0 }
      }
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    customCell: sharedOnCell
  }
])
const dataSourceMerge = ref([
  {
    name: 'Stephen Curry',
    age: 30,
    tel: '0666-12098909',
    phone: 18889898989,
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    tel: '0666-22098333',
    phone: 18899998888,
    address: 'Beijing, China'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    tel: '0888-32098909',
    phone: 18899998888,
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    tel: '0888-32098909',
    phone: 18899998888,
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Los Angeles'
  }
])
</script>
<template>
  <Table :columns="columnsMerge" :data-source="dataSourceMerge" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a href="javascript:;">{{ text }}</a>
      </template>
    </template>
  </Table>
</template>
```

:::

## 可编辑单元格

<Button style="margin-bottom: 16px" type="primary" :icon="() => h(PlusOutlined)" @click="handleCellAdd">新增</Button>
<Table :columns="columnsCellEditable" :data-source="dataSourceCellEditable" bordered>
  <template #bodyCell="{ column, text, record }">
    <template v-if="column.dataIndex === 'name'">
      <div class="editable-cell">
        <Flex v-if="cellEditableData[record.key]" justify="space-between" align="center">
          <Input v-model:value="cellEditableData[record.key].name" @enter="handleCellSave(record.key)" />
          <CheckOutlined class="cell-icon-check" @click="handleCellSave(record.key)" />
        </Flex>
        <Flex v-else justify="space-between" align="center">
          {{ text || ' ' }}
          <EditOutlined class="cell-icon" @click="handleCellEdit(record.key)" />
        </Flex>
      </div>
    </template>
    <template v-else-if="column.dataIndex === 'action'">
      <Popconfirm v-if="dataSourceCellEditable.length" title="Sure to delete?" @ok="handleCellDelete(record.key)">
        <a>delete</a>
      </Popconfirm>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PlusOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import type { TableColumn } from 'vue-amazing-ui'
const columnsCellEditable = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
])
const dataSourceCellEditable = ref([
  {
    key: '0',
    name: 'Edward King 0',
    age: 32,
    address: 'London, Park Lane no. 0'
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: 32,
    address: 'London, Park Lane no. 1'
  },
  {
    key: '2',
    name: 'Edward King 2',
    age: 32,
    address: 'London, Park Lane no. 2'
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const cellEditableData = reactive<Record<string, any>>({})
const handleCellAdd = () => {
  const count = dataSourceCellEditable.value.length
  const newData = {
    key: `${count}`,
    name: `Edward King ${count}`,
    age: 32,
    address: `London, Park Lane no. ${count}`
  }
  dataSourceCellEditable.value.push(newData)
}
const handleCellEdit = (key: string) => {
  cellEditableData[key] = dataSourceCellEditable.value.filter((item) => key === item.key)[0]
}
const handleCellSave = (key: string) => {
  Object.assign(dataSourceCellEditable.value.filter((item) => key === item.key)[0], cellEditableData[key])
  delete cellEditableData[key]
}
const handleCellDelete = (key: string) => {
  dataSourceCellEditable.value = dataSourceCellEditable.value.filter((item) => item.key !== key)
}
</script>
<template>
  <Button style="margin-bottom: 16px" type="primary" :icon="() => h(PlusOutlined)" @click="handleCellAdd">新增</Button>
  <Table :columns="columnsCellEditable" :data-source="dataSourceCellEditable" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <Flex v-if="cellEditableData[record.key]" justify="space-between" align="center">
            <Input v-model:value="cellEditableData[record.key].name" @enter="handleCellSave(record.key)" />
            <CheckOutlined class="cell-icon-check" @click="handleCellSave(record.key)" />
          </Flex>
          <Flex v-else justify="space-between" align="center">
            {{ text || ' ' }}
            <EditOutlined class="cell-icon" @click="handleCellEdit(record.key)" />
          </Flex>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'action'">
        <Popconfirm v-if="dataSourceCellEditable.length" title="Sure to delete?" @ok="handleCellDelete(record.key)">
          <a>delete</a>
        </Popconfirm>
      </template>
    </template>
  </Table>
</template>
<style lang="less" scoped>
.editable-cell {
  .cell-icon {
    display: none;
  }
  .cell-icon,
  .cell-icon-check {
    &:hover {
      transition: color 0.3s;
      color: #1890ff;
    }
  }
  &:hover {
    .cell-icon {
      display: inline-block;
    }
  }
}
</style>
```

:::

## 可编辑行

<Table
  :columns="columnsRowEditable"
  :data-source="dataSourceRowEditable"
  bordered
  :loading="tableLoading"
  :pagination="{
    total: 100
  }"
  @change="handleTableChange"
>
  <template #bodyCell="{ column, text, record }">
    <template v-if="['name', 'address'].includes(column.dataIndex)">
      <Input
        v-if="rowEditableData[record.key]"
        v-model:value="rowEditableData[record.key][column.dataIndex]"
        style="margin: -5px 0"
      />
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template v-else-if="column.dataIndex === 'age'">
      <InputNumber
        v-if="rowEditableData[record.key]"
        width="100%"
        v-model:value="rowEditableData[record.key][column.dataIndex]"
        style="margin: -5px 0"
      />
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template v-else-if="column.dataIndex === 'action'">
      <span v-if="rowEditableData[record.key]">
        <a @click="handleRowSave(record.key)">Save</a>
        <Divider vertical />
        <Popconfirm title="Sure to cancel?" @ok="handleRowCancel(record.key)">
          <a>Cancel</a>
        </Popconfirm>
      </span>
      <span v-else>
        <a @click="handleRowEdit(record.key)">Edit</a>
      </span>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const tableLoading = ref<boolean>(false)
const columnsRowEditable = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: '15%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '40%'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceRowEditable = ref<Record<string, any>[]>(data.slice(0, 10))
const rowEditableData = reactive<Record<string, any>>({})
const handleRowEdit = (key: string) => {
  rowEditableData[key] = dataSourceRowEditable.value.filter((item) => key === item.key)[0]
}
const handleRowSave = (key: string) => {
  Object.assign(dataSourceCellEditable.value.filter((item) => key === item.key)[0], rowEditableData[key])
  delete rowEditableData[key]
}
const handleRowCancel = (key: string) => {
  delete rowEditableData[key]
}
const handleTableChange = (page: number, pageSize: number) => {
  tableLoading.value = true
  setTimeout(() => {
    dataSourceRowEditable.value = data.slice((page - 1) * pageSize, page * pageSize)
    tableLoading.value = false
  }, 500)
}
</script>
<template>
  <Table
    :columns="columnsRowEditable"
    :data-source="dataSourceRowEditable"
    bordered
    :loading="tableLoading"
    :pagination="{
      total: 100
    }"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'address'].includes(column.dataIndex)">
        <Input
          v-if="rowEditableData[record.key]"
          v-model:value="rowEditableData[record.key][column.dataIndex]"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-else-if="column.dataIndex === 'age'">
        <InputNumber
          v-if="rowEditableData[record.key]"
          width="100%"
          v-model:value="rowEditableData[record.key][column.dataIndex]"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-else-if="column.dataIndex === 'action'">
        <span v-if="rowEditableData[record.key]">
          <a @click="handleRowSave(record.key)">Save</a>
          <Divider vertical />
          <Popconfirm title="Sure to cancel?" @ok="handleRowCancel(record.key)">
            <a>Cancel</a>
          </Popconfirm>
        </span>
        <span v-else>
          <a @click="handleRowEdit(record.key)">Edit</a>
        </span>
      </template>
    </template>
  </Table>
</template>
```

:::

## 可展开

*当表格内容较多不能一次性完全展示时*

<br/>

<Table
  :columns="columnsExpandable"
  :data-source="dataSourceExpandable"
  :expand-column-width="100"
  showExpandColumn
  expandRowByClick
  expandFixed
  v-model:expandedRowKeys="expandedRowKeys"
  :scroll="{ x: 1600 }"
  @expand="handleExpand"
  @expandedRowsChange="handleExpandedRowsChange"
>
  <template #expandedRowRender="{ record }">
    {{ record.description }}
  </template>
  <template #expandColumnTitle>
    <span style="color: #d4380d">More</span>
  </template>
  <template #bodyCell="{ column }">
    <template v-if="column.key === 'action'">
      <a>Delete</a>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import type { TableProps, TableColumn } from 'vue-amazing-ui'
const columnsExpandable = reactive<TableColumn[]>([
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', key: 'action' }
])
const dataSourceExpandable = ref([
  {
    key: '1',
    name: 'Superman',
    age: 32,
    address: 'New York No.1 Lake Park',
    description: 'My name is Superman, I am 32 years old, living in New York No.1 Lake Park.'
  },
  {
    key: '2',
    name: 'Spiderman',
    age: 22,
    address: 'London No.2 Lake Park',
    description: 'My name is Spiderman, I am 42 years old, living in London No.2 Lake Park.'
  },
  {
    key: '3',
    name: 'Ironman',
    age: 36,
    address: 'Sidney No.3 Lake Park',
    description: 'My name is Ironman, I am 32 years old, living in Sidney No.3 Lake Park.'
  }
])
const expandedRowKeys = ref<TableProps['expandedRowKeys']>(['1'])
watchEffect(() => {
  console.log('expandedRowKeys', expandedRowKeys.value)
})
const handleExpand = (expanded: boolean, record: Record<string, any>) => {
  console.log('expanded', expanded)
  console.log('record', record)
}
const handleExpandedRowsChange = (expandedRows: string[]) => {
  console.log('expandedRowsChange', expandedRows)
}
</script>
<template>
  <Table
    :columns="columnsExpandable"
    :data-source="dataSourceExpandable"
    :expand-column-width="100"
    showExpandColumn
    expandRowByClick
    expandFixed
    v-model:expandedRowKeys="expandedRowKeys"
    :scroll="{ x: 1600 }"
    @expand="handleExpand"
    @expandedRowsChange="handleExpandedRowsChange"
  >
    <template #expandedRowRender="{ record }">
      {{ record.description }}
    </template>
    <template #expandColumnTitle>
      <span style="color: #d4380d">More</span>
    </template>
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <a>Delete</a>
      </template>
    </template>
  </Table>
</template>
```

:::

## 固定列

*对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用*
*建议指定 `scroll.x` 为大于表格宽度的固定值或百分比，且非固定列宽度之和不要超过 `scroll.x`*

<br/>

<Table :columns="columnsFixColumn" :data-source="dataSourceFixColumn" :scroll="{ x: 1600 }">
  <template #bodyCell="{ column }">
    <template v-if="column.key === 'action'">
      <a>action</a>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columnsFixColumn = reactive<TableColumn[]>([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100
  }
])
const dataSourceFixColumn = ref([
  {
    key: '1',
    name: 'Stephen Curry',
    age: 30,
    address: 'Chase Center, GSW'
  },
  {
    key: '2',
    name: 'the Muse Catcher',
    age: 24,
    address: 'Beijing, China'
  },
  {
    key: '3',
    name: 'Wonder Woman',
    age: 32,
    address: 'Tel Aviv, Israel'
  }
])
</script>
<template>
  <Table :columns="columnsFixColumn" :data-source="dataSourceFixColumn" :scroll="{ x: 1600 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <a>action</a>
      </template>
    </template>
  </Table>
</template>
```

:::

## 固定表头

*方便一页内展示大量数据*

<br/>

<Table :columns="columnsFixHeader" :data-source="dataSourceFixHeader" :scroll="{ y: 240 }" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columnsFixHeader = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceFixHeader = ref(data)
</script>
<template>
  <Table :columns="columnsFixHeader" :data-source="dataSourceFixHeader" :scroll="{ y: 240 }" />
</template>
```

:::

## 固定头和列

*适合同时展示有大量数据和数据列*
*建议指定 `scroll.x` 为大于表格宽度的固定值或百分比，且非固定列宽度之和不要超过 `scroll.x`*

<br/>

<Table
  :columns="columnsFixHeaderAndColumn"
  :data-source="dataSourceFixHeaderAndColumn"
  :scroll="{ x: 1500, y: 300 }"
>
  <template #bodyCell="{ column }">
    <template v-if="column.key === 'action'">
      <a>action</a>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columnsFixHeaderAndColumn = reactive<TableColumn[]>([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceFixHeaderAndColumn = ref(data)
</script>
<template>
  <Table
    :columns="columnsFixHeaderAndColumn"
    :data-source="dataSourceFixHeaderAndColumn"
    :scroll="{ x: 1500, y: 300 }"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <a>action</a>
      </template>
    </template>
  </Table>
</template>
```

:::

## 随页面滚动的固定表头和滚动条

*对于长表格，可以设置跟随页面固定表头和滚动条，方便查看表头和使用滚动条*

<br/>

<Table
  :columns="columnsFixHeaderAndScrollbar"
  :data-source="dataSourceFixHeaderAndScrollbar"
  sticky
  :scroll="{ x: 1500 }"
>
  <template #bodyCell="{ column }">
    <template v-if="column.key === 'action'">
      <a>action</a>
    </template>
  </template>
</Table>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const columnsFixHeaderAndScrollbar = reactive<TableColumn[]>([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceFixHeaderAndScrollbar = ref(data)
</script>
<template>
  <Table
    :columns="columnsFixHeaderAndScrollbar"
    :data-source="dataSourceFixHeaderAndScrollbar"
    sticky
    :scroll="{ x: 1500 }"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <a>action</a>
      </template>
    </template>
  </Table>
</template>
```

:::

## 表头分组

*`columns[n]` 可以内嵌 children，以渲染分组表头*

<br/>

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="groupBordered" /> </Space>
  <Table
    :columns="columnsHeaderGroup"
    :data-source="dataSourceHeaderGroup"
    :bordered="groupBordered"
    :scroll="{ x: 1500, y: 240 }"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const groupBordered = ref<boolean>(true)
const columnsHeaderGroup = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a: Record<string, number>, b: Record<string, number>) => a.age - b.age
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 200
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 200
      }
    ]
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right'
  }
])
// 获取 0~10 之间的随机整数
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //加 1 是因为包含 max
}
const dataSourceHeaderGroup = [...Array(100)].map((_, i) => ({
  key: i.toString(),
  name: 'John Brown',
  age: getRandomIntInclusive(0, 10),
  street: 'Lake Park',
  building: 'C' + i,
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLake Co',
  gender: 'M'
}))
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="groupBordered" /> </Space>
    <Table
      :columns="columnsHeaderGroup"
      :data-source="dataSourceHeaderGroup"
      :bordered="groupBordered"
      :scroll="{ x: 1500, y: 240 }"
    />
  </Flex>
</template>
```

:::

## 表格排序

<Flex vertical>
  <Space align="center"> bordered: <Switch v-model="sortBordered" /> </Space>
  <Table :columns="columnsSort" :data-source="dataSourceSort" :bordered="sortBordered" @sortChange="onSortChange" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumn } from 'vue-amazing-ui'
const sortBordered = ref<boolean>(true)
const columnsSort = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: Record<string, string>, b: Record<string, string>) => a.name.length - b.name.length,
    sortDirections: ['descend']
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: Record<string, number>, b: Record<string, number>) => a.age - b.age
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a: Record<string, string>, b: Record<string, string>) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend']
  }
])
const dataSourceSort = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No.1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No.1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No.12 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No.102 Lake Park'
  }
])
function onSortChange(column: TableColumn, currentDataSource: Record<string, any>[]) {
  console.log('sort column', column)
  console.log('sort currentDataSource', currentDataSource)
}
</script>
<template>
  <Flex vertical>
    <Space align="center"> bordered: <Switch v-model="sortBordered" /> </Space>
    <Table :columns="columnsSort" :data-source="dataSourceSort" :bordered="sortBordered" @sortChange="onSortChange" />
  </Flex>
</template>
```

:::

## 可选择

*可通过 `rowSelection` 属性来自定义选择功能*

<br/>

<Flex vertical>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Space gap="small" vertical> bordered: <Switch v-model="selectionBordered" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        columnTitle: <Input v-model:value="rowSelection.columnTitle" placeholder="columnTitle" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        columnWidth: <Slider v-model:value="rowSelection.columnWidth" :min="32" :max="120" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> fixed: <Switch v-model="rowSelection.fixed" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> hideSelectAll: <Switch v-model="rowSelection.hideSelectAll" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        type:
        <Radio :options="selectionTypeOptions" v-model:value="rowSelection.type" button button-style="solid" />
      </Space>
    </Col>
  </Row>
  <Space>
    <Button @click="clear">清空</Button>
  </Space>
  <Table
    :columns="columnsSelection"
    :data-source="dataSourceSelection"
    :row-selection="rowSelection"
    :bordered="selectionBordered"
    :scroll="{ x: 1500 }"
  >
    <template #header> Selected {{ rowSelection.selectedRowKeys?.length }} items </template>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </Table>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import type { TableColumn, TableSelection } from 'vue-amazing-ui'
const selectionBordered = ref<boolean>(true)
const columnsSelection = reactive<TableColumn[]>([
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
])
const data: Record<string, any>[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceSelection = ref(data)
const selectionTypeOptions = [
  {
    label: 'Checkbox',
    value: 'checkbox'
  },
  {
    label: 'Radio',
    value: 'radio'
  }
]
const rowSelection = reactive<TableSelection>({
  columnTitle: undefined,
  columnWidth: 100,
  fixed: true,
  hideSelectAll: false,
  type: 'checkbox',
  selectedRowKeys: ['3'],
  onChange: (selectedRowKeys: string[], selectedRows: Record<string, any>[]) => {
    console.log('onChange')
    console.log('selectedRowKeys', selectedRowKeys)
    console.log('selectedRows', selectedRows)
    rowSelection.selectedRowKeys = selectedRowKeys
  },
  onSelect: (
    record: Record<string, any>,
    selected: boolean,
    selectedRows: Record<string, any>[],
    selectedRowKeys: string[]
  ) => {
    console.log('onSelect')
    console.log('record', record)
    console.log('selected', selected)
    console.log('selectedRows', selectedRows)
    console.log('selectedRowKeys', selectedRowKeys)
  },
  onSelectAll: (
    selected: boolean,
    selectedRows: Record<string, any>[],
    changeRows: Record<string, any>[],
    selectedRowKeys: string[],
    changeRowKeys: string[]
  ) => {
    console.log('onSelectAll')
    console.log('selected', selected)
    console.log('selectedRows', selectedRows)
    console.log('changeRows', changeRows)
    console.log('selectedRowKeys', selectedRowKeys)
    console.log('changeRowKeys', changeRowKeys)
  },
  getSelectionProps: (record: Record<string, any>) => ({
    disabled: record.key === '5',
    name: record.name
  })
})
const clear = () => {
  rowSelection.selectedRowKeys = []
}
watchEffect(() => {
  console.log('rowSelection.selectedRowKeys', rowSelection.selectedRowKeys)
})
</script>
<template>
  <Flex vertical>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space gap="small" vertical> bordered: <Switch v-model="selectionBordered" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          columnTitle: <Input v-model:value="rowSelection.columnTitle" placeholder="columnTitle" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          columnWidth: <Slider v-model:value="rowSelection.columnWidth" :min="32" :max="120" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> fixed: <Switch v-model="rowSelection.fixed" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> hideSelectAll: <Switch v-model="rowSelection.hideSelectAll" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          type:
          <Radio :options="selectionTypeOptions" v-model:value="rowSelection.type" button button-style="solid" />
        </Space>
      </Col>
    </Row>
    <Space>
      <Button @click="clear">清空</Button>
    </Space>
    <Table
      :columns="columnsSelection"
      :data-source="dataSourceSelection"
      :row-selection="rowSelection"
      :bordered="selectionBordered"
      :scroll="{ x: 1500 }"
    >
      <template #header> Selected {{ rowSelection.selectedRowKeys?.length }} items </template>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </Table>
  </Flex>
</template>
```

:::

<style lang="less" scoped>
:deep(.even-row td) {
  color: #1677ff !important;
}
:deep(.age) {
  color: #09c8ce !important;
}
:deep(.older-row .age) {
  color: #eb2f96 !important;
}
.editable-cell {
  .cell-icon {
    display: none;
  }
  .cell-icon,
  .cell-icon-check {
    &:hover {
      transition: color 0.3s;
      color: #1890ff;
    }
  }
  &:hover {
    .cell-icon {
      display: inline-block;
    }
  }
}
.table-td a {
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #4096ff;
  }
}
</style>

## APIs

### Table

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
header | 表格标题 | string &#124; slot | undefined
footer | 表格尾部 | string &#124; slot | undefined
columns | 表格列的配置项 | [Column](#column-type)[] | []
dataSource | 表格数据数组 | object[] | []
bordered | 是否展示外边框和列边框 | boolean | false
rowClassName | 自定义行的类名 | string &#124; ((record: Record<string, any>, rowIndex: number) => string) | undefined
size | 表格大小 | 'large' &#124; 'middle' &#124; small | 'large'
striped | 是否使用斑马条纹 | boolean | false
loading | 是否加载中 | boolean | false
spinProps | `Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin)，用于配置数据加载中 | object | {}
emptyProps | `Empty` 组件属性配置，参考 [Empty Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html#empty)，用于配置暂无数据 | object | {}
ellipsisProps | `Ellipsis` 组件属性配置，参考 [Ellipsis Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html#ellipsis)，用于全局配置文本省略 | object | {}
showSorterTooltip | 表头是否显示下一次排序的 `tooltip` 提示 | boolean | true
sortDirections | 支持的排序方式 | ('ascend' &#124; 'descend')[] | ['ascend', 'descend']
sortTooltipProps | 排序 `Tooltip` 组件属性配置，参考 [Tooltip Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)，用于全局配置排序弹出提示 | object | {}
sticky | 是否设置粘性定位的表头和水平滚动条，设置之后表头和滚动条会跟随页面固定 | boolean | false
showPagination | 是否显示分页 | boolean | true
pagination | `Pagination` 组件属性配置，参考 [Pagination Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/pagination.html#pagination)，用于配置分页功能 | object | {}
rowKey | 表格内容行的唯一标识 `key`，可以是字符串或一个函数 | string &#124; ((record: Record<string, any>, index?: number) => string) | 'key'
rowSelection | 列表项是否可选择 | [Selection](#selection-type) | undefined
scroll | 表格是否可滚动，也可以指定滚动区域的宽、高 | [ScrollOption](#scrolloption-type) &#124; boolean | undefined
scrollbarProps | `Scrollbar` 组件属性配置，参考 [Scrollbar Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar)，用于配置表格滚动条 | object | {}
tableLayout | 表格布局方式，设为 `fixed` 表示内容不会影响列的布局，参考 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，固定表头/列或使用了 `column.ellipsis` 时，默认值为 `fixed` | 'auto' &#124; 'fixed' | undefined
showExpandColumn | 是否展示展开列 | boolean | false
expandColumnTitle | 自定义展开列表头 | string &#124; slot | undefined
expandColumnWidth | 展开列的宽度 | string &#124; number | 48
expandCell | 自定义展开按钮 | slot | undefined
expandedRowRender | 自定义额外的展开行内容 | slot | undefined
expandFixed | 是否固定展开列 | boolean | false
expandedRowKeys <Tag color="cyan">v-model</Tag> | 展开行的 `key` 数组，控制展开行的属性；需与 `dataSource` 数据中的 `key` 配合使用 | (string \| number)[] | []
expandRowByClick | 点击行是否展开 | boolean | false

### Column Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
title? | 列头显示文字 | string | undefined
align? | 列文本的对齐方式 | 'left' &#124; 'center' &#124; 'right' | undefined
width? | 列宽度，单位 `px` | string &#124; number | undefined
className? | 自定义列的类名 | string | undefined
colSpan? | 表头列合并,设置为 `0` 时，不渲染 | number | undefined
dataIndex? | 列数据在数据项中对应的路径索引；数据展示列必传，操作列可忽略 | string | undefined
key? | 自定义列标识，未设置 `dataIndex` 时作为 `Vue` 唯一的标识 | string | undefined
ellipsis? | 超过宽度是否自动省略 | boolean | undefined
ellipsisProps? | `Ellipsis` 组件属性配置，参考 [Ellipsis Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html#ellipsis)，用于单独配置某列文本省略 | object | undefined
fixed? | 列是否固定 | 'left' &#124; 'right' | undefined
slot? | 列插槽名称索引 | string | undefined
children? | 列表头分组的子节点 | [Column](#column-type)[] | undefined
showSorterTooltip? | 表头是否显示下一次排序的 `tooltip` 提示，较高优先级 | boolean | undefined
sortTooltipProps? | `Tooltip` 组件属性配置，参考 [Tooltip Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)，用于单独配置某列的排序弹出提示，较高优先级 | object | undefined
defaultSortOrder? | 默认排序顺序，建议只设置一列的默认排序；如果设置多列，则只有第一列默认排序生效 | 'ascend' &#124; 'descend' | undefined
sortDirections? | 支持的排序方式 | ('ascend' &#124; 'descend')[] | undefined
sorter? | 升序排序函数，参考 [Array.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 `compareFunction`，当列表头分组时，请将排序设置在叶子节点 | Function | undefined
customCell? | 设置单元格属性 | (record: Record<string, any>, rowIndex: number, column: Column) => object &#124; undefined | undefined

### Selection Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
columnTitle? | 自定义选择框标题 | string &#124; VNode | undefined
columnWidth? | 列表选择框宽度 | string &#124; number | undefined
fixed? | 复选框列是否固定在左边 | boolean | undefined
hideSelectAll? | 是否隐藏全选复选框 | boolean | undefined
type? | 复选框/单选框 | 'checkbox' &#124; 'radio' | undefined
selectedRowKeys? | 选中项的 `key` 数组，需和 `onChange` 配合使用 | string[] | undefined
onChange? | 选中项发生变化时的回调 | (selectedRowKeys: string[], selectedRows: Record<string, any>[]) => void | undefined
onSelect? | 点击除全选外某行选择框时的回调 | (record: Record<string, any>, selected: boolean, selectedRows: Record<string, any>[], selectedRowKeys: string[]) => void | undefined
onSelectAll? | 点击复选框全选时的回调 | (selected: boolean, selectedRows: Record<string, any>[], changeRows: Record<string, any>[], selectedRowKeys: string[], changeRowKeys: string[]) => void | undefined
getSelectionProps? | 选择框组件的属性配置 | (record: Record<string, any>, rowIndex: number) => object | undefined

### ScrollOption Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
initialScrollPositionOnChange? | 当分页、排序变化后是否滚动到表格初始位置 | boolean | undefined
x? | 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，`true` 和 `'max-content'` | string &#124; number &#124; true | undefined
y? | 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值 | string &#124; number | undefined

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
header | 自定义表格标题 | v-slot:header
footer | 自定义表格尾部 | v-slot:footer
expandColumnTitle | 自定义展开列表头 | v-slot:expandColumnTitle
headerCell | 个性化头部单元格 | v-slot:headerCell="{ column, title }"
expandCell | 自定义展开按钮 | v-slot:expandCell="{ record, index, expanded }"
bodyCell | 个性化单元格 | v-slot:bodyCell="{ column, record, text, index }"
expandedRowRender | 自定义额外的展开行内容 | v-slot:expandedRowRender="{ record, index, expanded }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
expand | 点击展开图标时的回调 | (expanded: boolean, record: Record<string, any>) => void
expandedRowsChange | 展开的行变化时的回调 | (expandedRows: string[]) => void
sortChange | 排序变化时的回调 | (column: [Column](#column-type), currentDataSource: Record<string, any>[]) => void
change | 分页变化时的回调 | (pager: { page: number, pageSize: number }) => void
