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
                            <div class="item-input ">
                               <textarea v-model="address"  placeholder="请输入联系地址"></textarea>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="content-block">
                <a href="javascript:;" class="button button-big del-btn" :class="{'disabled':disabled}" @click="del">删除地址</a>
            </div>
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
                address:'',
                abled:true,
                showToast: false,
                options: {} 
             }
        },
        components:{toast},
        computed:{
            disabled:function(){
                    const phoneReg=/^1[0-9]{10}$/;
                    if(this.address&&this.abled){
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
            del:function(){
               this.address=""
            },
            save:function(){
                let obj={ content: '请输入联系地址'}
                var th=this;
                if(!this.address){
                    th.showToast=true;
                    th.options=obj
                    return false;
                }else if(this.address.length>50){
                    th.showToast=true;
                    th.options={content:'联系地址不超过50个字符'}
                    return ;
                }else{
                    th.requestData();
                    th.$router.back()
                }
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
    .del-btn{
        width:203px;
        margin:auto;
        height:86px;
        border-radius: 43px;
        background: #fff;
        color: #4a4a4a;
        border-color: #fff
    }
    .del-btn.disabled{
        background: #fff;
        opacity: 0.5
    }

</style>