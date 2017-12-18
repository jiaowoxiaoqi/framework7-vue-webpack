<template>
    <!--<div class="item-input clear-input">-->
        <input :type="type" ref="input" :value="value"  :placeholder="placeholder"  @input="updateValue($event.target.value)" @focus="selectAll" @blur="formatValue">
        <!--<a href="javascript:;" class="iconfont icon-error" v-show="value&&clear==param" @click="value=''"></a>-->
    <!--</div>-->
</template>
<script>
import utils from '../../assets/js/util';
export default {
    props: {
        value: {
            default: 0
        },
        placeholder:{
            type:String,
            default:''
        },
        type:{
            default:''
        },
        param:{
            type:String,
            default:''
        }
    },
    data:function(){
        return {
            clear:''
        }
    },
  mounted: function () {
    this.formatValue()
  },
  methods: {
    updateValue: function (value) {
        console.log(value)
      var result = utils.parse(value, this.value)
      console.log(result)
      if (result.warning) {
            this.$refs.input.value = result.value
      }
      this.$emit('input', result.value)
    },
    formatValue: function () {
      this.$refs.input.value = utils.format(this.value);
        this.$emit('child-blur');
    },
    selectAll: function (event) {
        this.$emit('child-focus',this.param);
    }
  }
    }
</script>
<style scoped>
    .clear-input input[type=number],
    .clear-input input[type=text],
    .clear-input input[type=tel]{
        font-size: 14px;
        width:95%
    }
    input::placeholder,
    input::-webkit-input-placeholder {
        font-size: 14px;
        color: #ccc
    }
   .clear-input .icon-error{width:22px;display: inline-block;vertical-align: middle}
</style>