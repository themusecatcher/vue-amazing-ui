<script setup lang="ts">
import { ref, reactive, onBeforeMount, watchEffect, h } from 'vue'
import { SmileOutlined, PlusOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
const loading = ref(false)
const tableLoading = ref(false)
const sizeBordered = ref(true)
const alignBordered = ref(true)
const stripedBordered = ref(true)
const headerFooterbordered = ref(true)
const groupBordered = ref(true)
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
const size = ref('middle')
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
const align = ref('center')
const columns = reactive([
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
const columnsSize = reactive([
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' }
])
const columnsAlign = reactive([
  { title: 'Name', align: 'center', dataIndex: 'name' },
  { title: 'Age', align: 'center', dataIndex: 'age' },
  { title: 'Address', align: 'center', dataIndex: 'address' }
])
watch(align, () => {
  columnsAlign.forEach((column) => (column.align = align.value))
})
const columnsStriped = reactive([
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
const columnsEllipsis = reactive([
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
const sharedOnCell = (record: any, index: number) => {
  if (index === 4) {
    return { colSpan: 0 }
  }
}
const columnsMerge = [
  {
    title: 'Name',
    dataIndex: 'name',
    customCell: (record: any, index: number) => {
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
    customCell: (record: any, index: number) => {
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
    customCell: (record: any, index: number) => {
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
]
const columnsCellEditable = reactive([
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
const columnsRowEditable = reactive([
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
const columnsExpandable = reactive([
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', key: 'action' }
])
const columnsFixColumn = reactive([
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
const columnsFixHeader = reactive([
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
const columnsFixHeaderAndColumn = reactive([
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
const columnsHeaderGroup = reactive([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left'
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe'
    //   },
    //   {
    //     text: 'John',
    //     value: 'John'
    //   }
    // ],
    // onFilter: (value: string, record: any) => record.name.indexOf(value) === 0
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a: any, b: any) => a.age - b.age
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
        key: 'companyName'
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
const data: any[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
const dataSourceRowEditable = ref<any[]>(data.slice(0, 10))
const dataSourceExpandable = ref([
  {
    key: 1,
    name: 'Superman',
    age: 32,
    address: 'New York No.1 Lake Park',
    description: 'My name is Superman, I am 32 years old, living in New York No.1 Lake Park.'
  },
  {
    key: 2,
    name: 'Spiderman',
    age: 22,
    address: 'London No.2 Lake Park',
    description: 'My name is Spiderman, I am 42 years old, living in London No.2 Lake Park.'
  },
  {
    key: 3,
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
// 获取 0~10 之间的随机整数
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //加 1 是因为包含 max
}
const dataSourceHeaderGroup = [...Array(100)].map((_, i) => ({
  key: i,
  name: 'John Brown',
  age: getRandomIntInclusive(0, 10),
  street: 'Lake Park',
  building: 'C' + i,
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLake Co',
  gender: 'M'
}))
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
const cellEditableData = reactive<any>({})
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
const rowEditableData = reactive<any>({})
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
const expandedRowKeys = ref([1])
watchEffect(() => {
  console.log('expandedRowKeys', expandedRowKeys.value)
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Table
      :columns="columns"
      :data-source="dataSource"
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
    <h2 class="mt30 mb10">加载中</h2>
    <Flex vertical>
      <Table :columns="columns" loading />
      <Table :columns="columns" loading :spin-props="{ indicator: 'dynamic-circle' }" />
    </Flex>
    <h2 class="mt30 mb10">暂无数据</h2>
    <Flex vertical>
      <Table :columns="columns" />
      <Table :columns="columns" :empty-props="{ description: 'no data', image: 'filled' }" />
    </Flex>
    <h2 class="mt30 mb10">带边框</h2>
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
    <h2 class="mt30 mb10">三种尺寸</h2>
    <h3 class="mb10">另两种紧凑型的列表；小型列表适用于对话框内</h3>
    <Flex vertical>
      <Space align="center"> bordered: <Switch v-model="sizeBordered" /> </Space>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Table :columns="columnsSize" :data-source="dataSourceSize" :size="size" :bordered="sizeBordered" />
    </Flex>
    <h2 class="mt30 mb10">列对齐方式</h2>
    <Flex vertical>
      <Space align="center"> bordered: <Switch v-model="alignBordered" /> </Space>
      <Radio :options="alignOptions" v-model:value="align" button button-style="solid" />
      <Table :columns="columnsAlign" :data-source="dataSourceAlign" :bordered="alignBordered" />
    </Flex>
    <h2 class="mt30 mb10">斑马条纹</h2>
    <Flex vertical>
      <Space align="center"> bordered: <Switch v-model="stripedBordered" /> </Space>
      <Table :columns="columnsStriped" :data-source="dataSourcesStriped" striped :bordered="stripedBordered" />
    </Flex>
    <h2 class="mt30 mb10">页头和页脚</h2>
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
    <h2 class="mt30 mb10">单元格自动省略</h2>
    <h3 class="mb10">设置 column.ellipsis 可以让单元格内容根据宽度自动省略</h3>
    <Table :columns="columnsEllipsis" :data-source="dataSource">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </Table>
    <h2 class="mt30 mb10">合并单元格</h2>
    <h3 class="mb10"
      >表头只支持列合并，使用 column 里的 colSpan 进行设置；表格支持行/列合并，使用 customCell 将单元格属性 colSpan
      或rowSpan 设为 0 时，设置的表格不会渲染</h3
    >
    <Table :columns="columnsMerge" :data-source="dataSourceMerge" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a href="javascript:;">{{ text }}</a>
        </template>
      </template>
    </Table>
    <h2 class="mt30 mb10">可编辑单元格</h2>
    <Button style="margin-bottom: 16px" type="primary" :icon="() => h(PlusOutlined)" @click="handleCellAdd"
      >新增</Button
    >
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
    <h2 class="mt30 mb10">可编辑行</h2>
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
    <h2 class="mt30 mb10">可展开</h2>
    <h3 class="mb10">当表格内容较多不能一次性完全展示时</h3>
    <Table
      :columns="columnsExpandable"
      :data-source="dataSourceExpandable"
      :expand-column-width="100"
      showExpandColumn
      expandRowByClick
      expandFixed
      v-model:expandedRowKeys="expandedRowKeys"
      :scroll="{ x: 1600 }"
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
    <h2 class="mt30 mb10">固定列</h2>
    <h3 class="mb10">对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用</h3>
    <h3 class="mb10">建议指定 scroll.x 为大于表格宽度的固定值或百分比，且非固定列宽度之和不要超过 scroll.x</h3>
    <Table :columns="columnsFixColumn" :data-source="dataSourceFixColumn" :scroll="{ x: 1600 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a>action</a>
        </template>
      </template>
    </Table>
    <h2 class="mt30 mb10">固定表头</h2>
    <h3 class="mb10">方便一页内展示大量数据</h3>
    <Table :columns="columnsFixHeader" :data-source="dataSourceFixHeader" :scroll="{ y: 240 }" />
    <h2 class="mt30 mb10">固定头和列</h2>
    <h3 class="mb10">适合同时展示有大量数据和数据列</h3>
    <h3 class="mb10">建议指定 scroll.x 为大于表格宽度的固定值或百分比，且非固定列宽度之和不要超过 scroll.x</h3>
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
    <h2 class="mt30 mb10">表头分组</h2>
    <h3 class="mb10">columns[n] 可以内嵌 children，以渲染分组表头</h3>
    <Flex vertical>
      <Space align="center"> bordered: <Switch v-model="groupBordered" /> </Space>
      <a-table
        :columns="columnsHeaderGroup"
        :data-source="dataSourceHeaderGroup"
        :bordered="groupBordered"
        :scroll="{ x: 1500, y: 240 }"
      />
      <Table
        :columns="columnsHeaderGroup"
        :data-source="dataSourceHeaderGroup"
        :bordered="groupBordered"
        :scroll="{ x: 1500, y: 240 }"
      />
    </Flex>
  </div>
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
