<template>
<div class="content">
    <transition name="slide" mode="out-in" appear>
            <self-keybd @child-click="child"> </self-keybd>
    </transition>
</div>
</template>
<script>
import selfKeybd from './input/selfKeybd'
export default {
        name:'card',
        mounted(){
        },
        components:{selfKeybd},
        data:function(){
            return {

            }
        },
        computed:{

        },
        methods:{
           child:function(val){
               console.log(val)
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
.slide-enter-active, .slide-leave-active {
  transition: all .5s
}
.slide-enter,.slide-leave-active{
  opacity: 0;
  transform: translateY(30px);
}
</style>