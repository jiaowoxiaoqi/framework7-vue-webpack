<template>
  <div class="views">
      <div :class="['pages', {'navbar-fixed':isaliPay}]">
    <div class="view view-main">
      <div class="navbar " v-show="isaliPay">
        <div class="navbar-inner">
          <div class="left">
            <a href="javascript:;" class="link back" @click="back">
              <i class="icon icon-back"></i>
              <span>返回</span>
            </a>
          </div>
          <div class="title">发票代开</div>
          <div class="right"></div>
        </div>
      </div>


        <div class=" page-content">
          <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name:'app',
  created(){
    const th=this;
    th.$ajax({
        method: 'get',
        data:'',
        url: './static/index.json'
      }).then(function(re){
        var param={
          name:re.data.city,
          id:re.data.id
        };
           th.$store.commit({
                type: 'setSelectCityAction',
                param:param
            })
      }).catch(function(e){
          console.log(e)
      });
  },
  data () {
        return {
            msg:'index',
            isShowFooter:true,
            id:123,
            transitionName:'',
            isaliPay:true,
            showNotification: true
        }
    },
    watch: {
       '$route' (to, from) {
         if(f7){f7.closeModal()}
          const toDepth = to.path.split('/');
          const fromDepth = from.path.split('/');
          const toLen=toDepth[toDepth.length-1].length;
          const fromLen=fromDepth[fromDepth.length-1].length;
          if(fromDepth[fromDepth.length-1]==''){ this.transitionName='slide-fade';return};
          if(toDepth.length>fromDepth.length){
            this.transitionName='slide-fade';return
          }else{
            this.transitionName='slide-out';return
          }
          this.transitionName = toLen < fromLen ? 'slide-out' : 'slide-fade'
          // console.log(this.transitionName)
       }
    },
    methods:{
      back:function(){
        this.$router.back()
      }
    }
}
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  /*.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}*/
  
  .slide-fade-enter,
  .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }
  
  .slide-out-enter-active {
    transition: all .3s ease;
  }
  /*.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}*/
  
  .slide-out-enter,
  .slide-out-leave-active {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>