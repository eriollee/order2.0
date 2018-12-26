export default {
 /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'order_list',

 /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://localhost:8080/',
    pro: 'https://produce.com'
  },

   /**
   * @description 统计类型
   */
  statType: [
    {
      code: '0',
      name:'单选'
    },  
     {
      code :'1',
      name:'订购'
    }
  ],

  /**
   * @description 选择类型
   */
  chooseType: [
    {
      code: '0',
      name:'不填'
    },  
     {
      code :'1',
      name:'必填'
    }
  ],

    /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
}