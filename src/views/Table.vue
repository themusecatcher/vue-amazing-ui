<script setup lang="ts">
import { ref, reactive, onBeforeMount, computed, h } from 'vue'
import { SmileOutlined, PlusOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
const loading = ref(false)
const total = ref(5)
const bordered = ref(true)
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
const columns = reactive([
  {
    title: '名字',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: '职业',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: '性别',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: '地址',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: '操作',
    width: 150,
    key: 'action'
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
    title: '名字',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
])
const columnsRowEditable = reactive([
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%'
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%'
  },
  {
    title: 'action',
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
const columnsSize = reactive([
  { title: 'Name', dataIndex: 'name', fixed: 'left' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' }
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
const count = computed(() => dataSourceCellEditable.value.length + 1)
const handleCellEdit = (key: string) => {
  cellEditableData[key] = dataSourceCellEditable.value.filter((item) => key === item.key)[0]
}
const rowEditableData = reactive<any>({})
const handleRowEdit = (key: string) => {
  rowEditableData[key] = dataSourceRowEditable.value.filter((item) => key === item.key)[0]
}
const handleCellSave = (key: string) => {
  Object.assign(dataSourceCellEditable.value.filter((item) => key === item.key)[0], cellEditableData[key])
  delete cellEditableData[key]
}
const handleRowSave = (key: string) => {
  Object.assign(dataSourceCellEditable.value.filter((item) => key === item.key)[0], rowEditableData[key])
  delete rowEditableData[key]
}
const handleDelete = (key: string) => {
  dataSourceCellEditable.value = dataSourceCellEditable.value.filter((item) => item.key !== key)
}
const handleCancel = (key: string) => {
  delete rowEditableData[key]
}
const handleAdd = () => {
  const newData = {
    key: `${count.value}`,
    name: `Edward King ${count.value}`,
    age: 32,
    address: `London, Park Lane no. ${count.value}`
  }
  dataSourceCellEditable.value.push(newData)
}
const tableLoading = ref(false)
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
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{
        total: total,
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
    <Table :columns="columns" loading />
    <h2 class="mt30 mb10">暂无数据</h2>
    <Table :columns="columns" />
    <h2 class="mt30 mb10">带边框</h2>
    <Table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{
        total: total,
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
    <h2 class="mt30 mb10">页头和页脚</h2>
    <Space align="center"> bordered: <Switch v-model="bordered" /> </Space>
    <br />
    <br />
    <Table :columns="columns" :data-source="dataSource" :bordered="bordered">
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
    <h3 class="mb10">表头只支持列合并，使用 column 里的 colSpan 进行设置；表格支持行/列合并，使用 customCell 将单元格属性 colSpan 或 rowSpan 设为 0 时，设置的表格不会渲染</h3>
    <Table :columns="columnsMerge" :data-source="dataSourceMerge" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a href="javascript:;">{{ text }}</a>
        </template>
      </template>
    </Table>
    <h2 class="mt30 mb10">可编辑单元格</h2>
    <Button style="margin-bottom: 16px;" type="primary" :icon="() => h(PlusOutlined)" @click="handleAdd">新增</Button>
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
          <Popconfirm
            v-if="dataSourceCellEditable.length"
            title="Sure to delete?"
            @ok="handleDelete(record.key)"
          >
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
            <Popconfirm title="Sure to cancel?" @ok="handleCancel(record.key)">
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
        <span style="color: #d4380d;">More</span>
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
    <Table
      :columns="columnsFixHeader"
      :data-source="dataSourceFixHeader"
      :scroll="{ y: 240 }"
    />
    <h2 class="mt30 mb10">固定头和列</h2>
    <h3 class="mb10">适合同时展示有大量数据和数据列</h3>
    <h3 class="mb10">建议指定 scroll.x 为大于表格宽度的固定值或百分比，且非固定列宽度之和不要超过 scroll.x</h3>
    <a-table :columns="columnsFixHeaderAndColumn" :data-source="dataSourceFixHeaderAndColumn" :scroll="{ x: 1500, y: 300 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a>action</a>
        </template>
      </template>
    </a-table>
    <Table :columns="columnsFixHeaderAndColumn" :data-source="dataSourceFixHeaderAndColumn" :scroll="{ x: 1500, y: 300 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a>action</a>
        </template>
      </template>
    </Table> -->
    <h2 class="mt30 mb10">三种尺寸</h2>
    <h3 class="mb10">另两种紧凑型的列表；小型列表适用于对话框内</h3>
    <Flex vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <a-table :columns="columnsSize" :data-source="dataSourceSize" :size="size" />
      <Table :columns="columnsSize" :data-source="dataSourceSize" :size="size" />
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
