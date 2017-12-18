<template>
    <transition name="fade">
    <div class="notification fixed" v-if="sh"  >
        <div class="toast">
            {{opt.content }}
        </div>
    </div>
    </transition>
</template>

<script>
export default {
  data () {
    return {
      timers:[],
      opt:{},
      sh:false
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
     countdown () {
        const t = setTimeout(() => {
          this.close()
        }, this.options.showTime || 2000)
        this.timers.push(t)
    },
    close () {
      this.sh = false
      this.opt = {}
    }
  },
  watch:{
    options(){
       this.opt=this.options
       this.sh=this.show
        var th=this
        this.timers.forEach((timer) => {
            window.clearTimeout(timer)
        })
      this.timers = [];
      this.countdown()
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
    .notification {
        width: 100%;
        z-index: 3;
        position: fixed;
        top: 0;
        left: 0;
        height:30px;
        text-align: center;
        top:50%;
        margin-top:-15px;
        background: none;
    }
    
    .notification .toast {
        background: rgba(255, 255, 255, 0.8);
        display:inline-block;
        padding:2px 10px;
        border-radius: 15px;
        line-height: 30px;
        color: #4a4a4a;
    }
</style>