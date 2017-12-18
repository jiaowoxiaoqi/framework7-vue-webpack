<template>
<div class="content">
<div class="navbar ">
      <div class="navbar-inner">
        <div class="left">
            <a href="javascript:;" class="link back" @click="back">
                <i class="icon icon-back"></i>
                <span>返回</span>
            </a>
        </div>
        <div class="title">发票代开</div>
        <a class="right" @click="save">保存</a>
      </div>
    </div>
 <div class="list-block">
            <ul>
                <li>
    <div class="item-content">
        <div class="item-inner">
            <div class="item-input clear-input">
                <input type="tel" placeholder="请输入身份证号" :value="card" @change="showDel('card')" readonly >
                <a href="javascript:;" class="iconfont icon-error" v-show="card&&clear=='card'" @click="card=''"></a>
            </div>
        </div>
    </div>
    </li>
    </ul>
    </div>
    <transition name="slide" mode="out-in" appear>
        <self-keybd @child-click="child"> </self-keybd>
    </transition>
</div>
</template>
<script>
import selfKeybd from './input/selfKeybd'
export default {
        name:'uploadCard',
        mounted(){
        },
        components:{selfKeybd},
        data:function(){
            return {
                card:'',
                clear:''
            }
        },
        computed:{

        },
        methods:{
           child:function(val){
               let oldVal=String(this.card),len=oldVal.length;
               this.clear='card'
               if(val=='DEL'){
                 this.card=oldVal.substr(0,oldVal.length-1)
                 return
               }else if(oldVal.length>=18){
                   this.card=oldVal.substr(0,oldVal.length-1)+val;
                   return;
               }else{
                this.card=oldVal+val
               }
           },
           showDel:function(val){

           },
           back:function(){
               this.$router.back();
           },
           save:function(){

           }
        }
    }
</script>
<style scoped>
.content {
    background: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #ebebeb;
    height: 100%;
    z-index: 999
}
.content .content .list-block {
    margin-bottom: 15px;
    margin-top: 44px;
}
.content .icon-error{width:22px;display: inline-block;vertical-align: middle}
.clear-input {
    box-sizing: border-box;
    padding: 0 8px;
    overflow: hidden;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.slide-enter-active, .slide-leave-active {
  transition: all .5s
}
.slide-enter,.slide-leave-active{
  opacity: 0;
  transform: translateY(30px);
}
</style>