import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import List from '@/components/list'
import listInfo from '@/components/listinfo'
import City from '@/components/city'
import ShuiJv from '@/components/shuijv'
import FaPiao from '@/components/fapiao'
import Word from '@/components/word'
import Winfo from '@/components/winfo'//用户录入个人信息
import Sinfo from '@/components/sinfo'//展示个人信息
import UploadPhone from '@/components/uploadPhone'//修改手机
import UploadAddress from '@/components/uploadAddress'//修改手机
import UploadCard from '@/components/uploadCard'//修改身份证
import Details from '@/components/details'//代开明细输入

Vue.use(Router);
const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    }, {
      path: '/city',
      name: 'city',
      component: City
    }, {
      path: '/shuijv',
      name: 'shuijv',
      component: ShuiJv
    }, {
      path: '/fapiao',
      name: 'fapiao',
      component: FaPiao
    }, {
      path: '/Index',
      name: 'Main',
      component: Index
    }, {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/ListInfo',
      name: 'ListInfo',
      component: listInfo
    },
    {
      path: '/shuijv/word',
      name: 'word',
      component: Word
    },
    {
      path: '/winfo',
      name: 'winfo',
      component: Winfo
    },
    {
      path: '/sinfo',
      name: 'sinfo',
      component: Sinfo,
      children:[
        {
          path:'/sinfo/uploadPhone',
          name:'uploadPhone',
          component:UploadPhone
        },
        {
          path:'/sinfo/uploadAddress',
          name:'uploadAddress',
          component:UploadAddress
        },
        {
        path: '/sinfo/uploadCard',
        name: 'uploadCard',
        component: UploadCard
      },
      ]
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
  ],
});
router.beforeEach((to,from,next)=>{
  // console.log(to.path)
  // console.log(from.path)
  next()
})
export default router;
