
import Cookies from 'js-cookie'
import { forEach, hasOneOf, } from '@/libs/tools'
import config from '@/config'
const {  cookieExpires } = config

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
    const inTwentySeconds= new Date(new Date().getTime() + 20 *60*  1000);
    Cookies.set(TOKEN_KEY, token, 
    {
      expires: inTwentySeconds
    });
}

export const getToken = () => {
  //Cookies.set(TOKEN_KEY, '');
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}


//显示菜单名称
export const showTitle = (item, vm) => {
  let { title } = item.meta
  return title
}

export const getMenuByRouter = (list, access) => {
    let res = []

    forEach(list, item => {
      if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
        let obj = {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name,
          meta: item.meta
        }

        //如有子菜单递归调用
        if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
          obj.children = getMenuByRouter(item.children, access)
        }
        if (item.meta && item.meta.href) obj.href = item.meta.href
        if (showThisMenuEle(item, access)) res.push(obj)
      }
    })
    // console.log('getMenuByRouter')
    // console.log(res)
    return res
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1
 //   console.log(routers)
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
      let item = routers[i]
      if (item.children && item.children.length) {
        let res = getHomeRoute(item.children, homeName)
        if (res.name) return res
      } else {
        if (item.name === homeName) homeRoute = item
      }
    }
   // console.log(homeRoute)
    return homeRoute
  }

//是否有子菜单
export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}
  
//是否有子菜单
const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
      if (hasOneOf(item.meta.access, access)) return true
      else return false
    } else return true
}


export const fmtDateTime = (d1,h1,d2,h2) => {
  let dateTemp1 = this.fmtDate(d1) + ' '+ h1
  let dateTemp2 = this.fmtDate(d2) + ' '+ h2
  dateTemp1 = dateTemp1.replace("-","/");//替换字符，变成标准格式 
  dateTemp2 = dateTemp2.replace("-","/");//替换字符，变成标准格式   
  let date1 = new Date(Date.parse(dateTemp1));  
  let date2 = new Date(Date.parse(dateTemp2));  
 if(date1<=date2){
     return true
 }else{
     return false
 }
 
}
export const fmtDate = (obj) =>{
 let date =  new Date(obj);
 let y = 1900+date.getYear();
 let m = "0"+(date.getMonth()+1);
 let d = "0"+date.getDate();
 return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

export const fmtTime = (inputTime)  => {
 let date = new Date(inputTime);  
 let h = date.getHours();  
 h = h < 10 ? ('0' + h) : h;  
 let minute = date.getMinutes();  
//  let second = date.getSeconds();  
 minute = minute < 10 ? ('0' + minute) : minute;    
//  second = second < 10 ? ('0' + second) : second;   
 return h+':'+minute;    
}
const change = (status,index=0,type ="0") => {
     if(!status){
         this.switchShow = true;
         this.$emit('report', this.fmtDate(this.startDate),this.startTimeValue,this.fmtDate(this.endDate),this.endTimeValue,this.index);
     }else{
         if(this.startDate ==""){
             this.$Message.error("请选择起始日期");
             if(type =="1"){
                 this.$emit('setSwitchOff',index);
             }
         }else if(this.endDate ==""){
             this.$Message.error("请选择截止日期");
             if(type =="1"){
                 this.$emit('setSwitchOff',index);
             }
         }else if(this.endTimeValue == ''){
             this.$Message.error('请选择截止时间');
             if(type =="1"){
                 this.$emit('setSwitchOff',index);
             }
         }else if(this.startTimeValue == ''){
             this.$Message.error('请选择起始时间');
             if(type =="1"){
                 this.$emit('setSwitchOff',index);
             }
         }else if(this.fmtDateTime(this.startDate,this.startTimeValue,this.endDate,this.endTimeValue) == false){
             this.$Message.error('起始时间大于截止时间');
             if(type =="1"){
                 this.$emit('setSwitchOff',index);
             }
         }
         else{
             this.$emit('report', this.fmtDate(this.startDate),this.startTimeValue,this.fmtDate(this.endDate),this.endTimeValue,this.index);
         }
     }             
}