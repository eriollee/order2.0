<template>
  <Row>
  <div style="padding-bottom:10px; virtical-align: middle;" >
         <Button @click="modalAdd = true" style="  " >  <Icon type="md-add" size="16" style="padding-bottom:1px" /><span style="  "> 新增统计</span></Button>
  </div>
  <Table :loading="loading"  :columns="columns" :data="data">
    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="type">
      <span >{{ row.type }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="date">
      <div   v-if="editIndex === index"  >
        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm"   placement="top"  placeholder="请选择统计时间范围" style="width: 250px"  v-model="editDate"  @on-ok="handleOk"> </DatePicker>
      </div>
      <span v-else>{{ row.date}}</span>
    </template>

    <template slot-scope="{ row, index }" slot="mobile">
      <Select  v-if="editIndex === index"  style="width:80px"  v-model="row.mobile">
        <Option  v-for="item in chooseList" :value="item.name" :key="item.code">{{ item.name}}</Option>
      </Select>
      <span v-else>{{ row.mobile }}</span>
    </template>

     <template slot-scope="{ row, index }" slot="address">
       <Select v-if="editIndex === index"  style="width:80px" v-model="row.address">
        <Option  v-for="item in chooseList" :value="item.name" :key="item.code">{{ item.name }}</Option>
      </Select>
      <span v-else>{{ row.address }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button style="margin:2px"  @click="handleEdit(row, index)">编辑</Button>
        <Button style="margin:2px"  @click="handleEdit(row, index)">上线</Button>
        <Button style="margin:2px"  @click="handleEdit(row, index)">开启</Button>
        <Button style="margin:2px"  @click="handleEdit(row, index)">导出</Button>
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
  const { statType ,chooseType } = config

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
            width:100,
            slot: 'mobile'
          },
          {
            title: '快递地址',
            width:100,
            slot: 'address'
          },
          {
            title: '操作',
            width:320,
            slot: 'action'
          }
        ],
        data: [],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editDate: [new Date(),new Date()],  // 第三列输入框
        editMobile: '',  // 第三列输入框
        editAddress: '',  // 第四列输入框
        
      }
    },
    computed: {
      chooseList () {
          return chooseType;
      }
    },
    mounted () {
      getSystemList().then(res => {
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
            this.endDate = fmtDate(v.endTime)
            this.endTimeValue = fmtTime(v.endTime)
            tempDataEle.date =  this.startDate + " "+ this.startTimeValue + "-" + 
            this.endDate + " " + this.endTimeValue
            //手机 地址是否必填初始化
            chooseType.forEach((v2,k2)=>{
              if(v.systemFlag.substring(3,4) == v2.code)  tempDataEle.mobile = v2.name
              if(v.systemFlag.substring(4,5) == v2.code)  tempDataEle.address = v2.name
            })
            tempDataEle.startTime = v.startTime
            tempDataEle.endTime = v.endTime
            tempData.push(tempDataEle);
       
          })
        this.data = tempData
        this.loading = false;
      })
    },
    methods: {
      handleOk(){
          console.log(this.editDate)
      },
      handleEdit (row, index) {
  //      console.log(row)
        this.editName = row.name;
        this.editAge = row.age;
        this.editMobile = row.mobile
        this.editAddress = row.address;
        this.editDate[0] = new Date(row.startTime);
        this.editDate[1] = new Date(row.endTime);
        this.editIndex = index;
      },
      handleSave (index) {
        this.data[index].name = this.editName;
        this.data[index].age = this.editAge;
        this.data[index].birthday = this.editDate;
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

 