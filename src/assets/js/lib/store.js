import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const  store = new Vuex.Store({
  debug: true,
  state: {
    selectCity: {
        name:'',
        id:''
    },
    selectShui:{
        name:'',
        id:''
    },
    selectFaPiao:{
        name:'',
        id:''
    },
    isShowWord:false,   //判断用户是否点击税局规则不再显示
    userInfo:{
      id:'123123',
      name:'郭霆',
      card:'360124199311091210',
      phoneNum:'18770050845',
      address:'结合实际都很谨慎的好时机的好时机的好时机的好时机的好时机的好时机电话'
    }
  },
  getters: {
    getCityName: state => {
      return state.selectCity
    },
     getShuiName: state => {
      return state.selectShui
    },
     getFaPiaoType: state => {
      return state.selectFaPiao
    },
    getIsShowWord:state=>{
      state.isShowWord=localStorage.getItem('isShowWord')=='false'|| localStorage.getItem('isShowWord')==null? false : true;
      return state.isShowWord;
    },
    getUserInfo:state=>{
      return state.userInfo;
    }
  },
  mutations:{
    /**
     * @fun 选择城市赋值
     * @param Object {name:选择的名字,id:'选择的ID'}
     */
    setSelectCityAction (state,newObject) {
      state.selectCity=newObject.param;
    },
    /**
     * @fun 选择税局赋值
     * @param Object {name:选择的名字,id:'选择的ID'}
     */
    setSelectShuiAction (state,newObject) {
      state.selectShui =  newObject.param;
    },
    /**
     * @fun 选择发票类型赋值
     * @param Object {name:选择的名字,id:'选择的ID'}
     */
    setSelectFaPiaoAction (state,newObject) {
      state.selectFaPiao = newObject.param;
    },
    /**
     * @fun 监听用户是否点击不再显示
     */
    setIsShowWordAction (state,newValue) {
      localStorage.setItem('isShowWord',newValue.param)
      state.isShowWord = localStorage.getItem('isShowWord');
    },
    /**
     * @fun 用户信息修改
     */
    setUserInfoAction (state,newValue) {
      state.getUserInfo = newObject.param;
    },
  }
});
export default store;