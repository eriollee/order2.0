<template>
  <Row>
  <div style="padding-bottom:10px; virtical-align: middle;" >
         <Button @click="modalAdd = true" style="  " >  <Icon type="md-add" size="16"style="padding-bottom:1px" /><span style="  "> 新增统计</span></Button>
  </div>
  <Table :loading="loading"  :columns="columns" :data="data">
    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="type">
      <Input type="text" v-model="editAge" v-if="editIndex === index" />
      <span v-else>{{ row.type }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="date">
      <Input type="text" v-model="editBirthday" v-if="editIndex === index" />
      <span v-else>{{ row.date}}</span>
    </template>

    <template slot-scope="{ row, index }" slot="mobile">
      <Input type="text" v-model="mobile" v-if="editIndex === index" />
      <span v-else>{{ row.mobile }}</span>
    </template>

     <template slot-scope="{ row, index }" slot="address">
      <Input type="text" v-model="editAddress" v-if="editIndex === index" />
      <span v-else>{{ row.address }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">操作</Button>
          <Button @click="handleEdit(row, index)">操作</Button>
      </div>
    </template>
  </Table>
  <Modal
        v-model="modalAdd"
        title="新增统计"
        ok-text="确定"
        cancel-text="取消"
        >
        
    </Modal>
  </Row>
</template>
<script>
  import { getSystemList } from '@/api/data'
  import { fmtDate, fmtTime } from '@/libs/util'
  import config from '@/config'
  const { statType } = config

  export default {
    name: 'system_manager',
    data () {
      return {
        startTimeValue: '',
        endTimeValue: '',
        startDate:'',
        endDate:'',
        loading: true,
        modalAdd: false,
         columns: [
          {
            title: '统计名称',
            width:100,
            slot: 'name'
          },
          {
            title: '类型',
            width:100,
            slot: 'type'
          },
          {
            title: '统计起始日期',
            width:350,
            slot: 'date'
          },
          {
            title: '手机号',
            slot: 'mobile'
          },
          {
            title: '快递地址',
            slot: 'address'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        data: [],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editAge: '',  // 第二列输入框
        editBirthday: '',  // 第三列输入框
        editAddress: '',  // 第四列输入框
      }
    },
    mounted () {
      getSystemList().then(res => {
          console.log(res.data.data)
          console.log(statType)
       // flag 数据字典 统计类型 0 单选 1 订购 是否上线 是否开启 是否必填手机号 是否显示快递 0 否 1 是
          let tempData = []
          res.data.data.data.forEach((v,k)=>{
            let tempDataEle = {}
            tempDataEle.name = v.systemName
            //类型初始化
            statType.forEach((v2,k2)=>{
              if(v.systemFlag.substring(0,1) == v2.code)  tempDataEle.type = v2.name
            })
           //日期范围初始化
            this.startDate = fmtDate(v.startTime)
            this.startTimeValue = fmtTime(v.startTime)
            console.log(this.startDate)
            this.endDate = fmtDate(v.endTime)
            this.endTimeValue = fmtTime(v.endTime)
            tempDataEle.date =  this.startDate + " "+ this.startTimeValue + "~" + 
            this.endDate + " " + this.endTimeValue
            tempData.push(tempDataEle);
          })
        this.data = tempData
        this.loading = false;
      })
    },
    methods: {
      handleEdit (row, index) {
        this.editName = row.name;
        this.editAge = row.age;
        this.editAddress = row.address;
        this.editBirthday = row.birthday;
        this.editIndex = index;
      },
      handleSave (index) {
        this.data[index].name = this.editName;
        this.data[index].age = this.editAge;
        this.data[index].birthday = this.editBirthday;
        this.data[index].address = this.editAddress;
        this.editIndex = -1;
      },
      getBirthday (birthday) {
        const date = new Date(parseInt(birthday));
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
      }
    }
  }
</script>

 