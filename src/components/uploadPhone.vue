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
                                <input type="tel" placeholder="请输入手机号码" v-model.trim="phone" @focus="showDel('phone')" @blur="hideDel()">
                                <a href="javascript:;" class="iconfont icon-error" v-show="phone&&clear=='phone'" @click="del('phone')"></a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-input clear-input">
                                <input type="text" placeholder="请输入验证码" v-model.trim="code" @focus="showDel('code')" @blur="hideDel()">
                                <a href="javascript:;" class="iconfont icon-error" v-show="code&&clear=='code'" @click="del('code')"></a>
                            </div>
                            <div class="item-after"><a class="button code-button" :class="{'disabled':disabled}" @click="requestCode">{{codeTxt}}</a></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <toast :options.sync="options"  :show.sync="showToast"></toast>
    </div>
</template>
<script>
import toast from './toast/toast'
    export default {
        name:'uploadPhone',
        created:function(){
        },
        mounted(){
            f7.resizableTextarea('textarea');//文本域自动增高
        },
        data:function(){
            return {
                phone:'',
                code:'',
                clear:'',
                codeTxt:'获取验证码',
                abled:true,
                showToast: false,
                options: {} 
             }
        },
        components:{toast},
        // watch:{
        //     abled:function(){
        //         this.disabled=abled
        //     }
        // },
        computed:{
            disabled:function(){
                    const phoneReg=/^1[0-9]{10}$/;
                    if(this.phone&&phoneReg.test(this.phone)&&this.abled){
                        return false;
                    }else{
                       return true
                    }
                },

        },
        methods:{
            back:function(){
                this.$router.back()
            },
            showDel:function(value){
                this.clear=value
            },
            hideDel:function(){
                this.clear=false;
            },
            del:function(val){
                if(val=='phone'){this.phone='';return;}
                if(val=='code'){this.code='';return;}
            },
            save:function(){
                const phoneReg=/^1[0-9]{10}$/;
                let obj={ content: '请输入正确手机号'}
                var th=this;
                if(!this.phone||!phoneReg.test(this.phone)){
                    th.showToast=true;
                    th.options=obj
                    return false;
                }else if(!this.code){
                    th.showToast=true;
                    th.options={content:'请输入验证码'}
                    return ;
                }else{
                    th.requestData();
                    th.$router.back()
                }
            },
            requestCode:function(){
                var th=this;
                th.requestData('./static/index.json','',function(){
                    th.abled=false;
                    let codeTxt="10";
                    th.codeTxt=codeTxt+'s'
                    var timer=setInterval(function(){
                        codeTxt--;
                        th.codeTxt=codeTxt+'s';
                    if(codeTxt==0){
                        clearInterval(timer)
                         th.abled=true;
                         th.codeTxt="重新获取验证码"
                    }
                    },1000);
                })
            },
            requestData:function(url,param,callback){
                var th=this;
                th.$ajax({
                    method: 'get',
                    data:param,
                    url: url
                }).then(callback).catch(function(e){
                });
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
    .code-button {
        min-width: 80px;
        height: 30px;
        background: none;
        color: #fe8604;
        border-radius: 15px;
        font-size: 12px;
        padding: 0 10px;
        margin-top: -2px;
    }

    .code-button.disabled{
        color: #ccc;
        border-color: #ccc;
        background: none
    }
    .clear-input {
        box-sizing: border-box;
        padding: 0 8px;
        overflow: hidden;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
</style>