<template>
    <div class="content">

        <div class="content-block word" v-html="word">
                {{word}}
        </div>
        <!--底部按钮，不在显示选项-->
        <div class="foot-view content-block">
                <label for="ff">
                    <input id="ff" type="checkbox">
                    <i class="iconfont icon-checkbox" :class="{'icon-checked':isShowWord}"></i>
                    <span class="c-gray">&nbsp;不在提示</span>
                </label>
                <a href="javascript:;" @click="agreed"    replace :class="['button' ,'button-big' ]">我已阅读并同意</a>
        </div>
    </div>
</template>
<script>
    export default {
        name:'word',
        created:function(){
            var th=this;
           fetch('./static/word.txt').then(function(res) {  
               return res.text()
            }).then(function(v){
                th.word=v
            });
        },
        data:function(){
            return {
                word:'',
                isShowWord:false
            }
        },
        computed:{
             isShowWord(){
                  var store=this.$store.getters;
                  return store.getIsShowWord;
             }
             
        },
        methods:{
            agreed:function(){
                var th=this;
                this.$store.commit({
                    type: 'setIsShowWordAction',
                    param:th.isShowWord
                })
                th.$router.push({name:'Index',param:{}})
            }
        }
    }
</script>
<style scoped>
    .content-block{margin:0;margin-top:-20px;padding-top:10px}
    .foot-view{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        background: #fff;
        padding-bottom:20px;
        border-top:1px solid #ccc;
        color: #ccc;
    }
    .word{
        padding-bottom:80px;
    }
    .iconfont{
        font-size:18px
    }
    .foot-view , .foot-view label{
        vertical-align: middle;
    }
    .foot-view input{
        display: none
    }
    .foot-view .button{
        margin-top:10px
    }
    .c-gray{
        color: #4a4a4a;
    }
</style>