<template>
    <div class="content">
        <div class="list-block">
            <ul>
                <li>
                <div class="item-content">
                    <div class="item-inner">
                    <div class="item-title label">姓<span class="v-hide">空</span>名</div>
                    <div class="item-input">
                        <input type="text" placeholder="用户姓名" readonly>
                    </div>
                    </div>
                </div>
                </li>
                <li>
                <div class="item-content">
                    <div class="item-inner">
                    <div class="item-title label">身份证</div>
                    <div class="item-input">
                        <input type="email" placeholder="用户身份证号" readonly>
                    </div>
                    </div>
                </div>
                </li>            
            </ul>
        </div>
         <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                        <div class="item-title label">手机号</div>
                        <div class="item-input clear-input">
                            <input type="tel" placeholder="请输入手机号码" v-model.trim="phone" @focus="showDel('phone')" @blur="hideDel">
                            <a href="javascript:;" class="iconfont icon-error" v-show="phone&&clear=='phone'" @click="del('phone')"></a>
                        </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-input clear-input">
                                <input type="text" placeholder="请输入验证码" v-model.trim="code" @focus="showDel('code')" @blur="hideDel" >
                                <a href="javascript:;" class="iconfont icon-error" v-show="code&&clear=='code'" @click="del('code')"></a>
                            </div>
                            <div class="item-after"><a class="button code-button">获取验证码</a></div>
                        </div>
                    </div>
                </li>
           </ul>
        </div>
        <div class="list-block">
            <ul>
                <li class="align-top">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">联系地址</div>
                        <div class="item-input clear-input">
                          <textarea class="resizable" v-model.trim="address" @focus="showDel('address')"  @blur="hideDel"></textarea>
                          <a href="javascript:;" class="iconfont icon-error"  v-show="address&&clear=='address'" @click="del('address')"></a>
                        </div>
                      </div>
                    </div>
                </li>               
            </ul>
            <div class="tips">地址栏最多50个字</div>
        </div>
        <div class="content-block">
            <a href="javascript:;" class="button button-big" :class="disabled">确定</a>
        </div>
    </div>
</template>
<script>
    export default {
        name:'info',
        created:function(){
        },
        mounted(){
            f7.resizableTextarea('textarea');//文本域自动增高
        },
        data:function(){
            return {
                phone:'',
                code:'',
                address:'',
                clear:''
            }
        },
        computed:{
            disabled:function(){
                const phoneReg=/^1[0-9]{10}$/;
                if(this.phone&&phoneReg.test(this.phone)&&this.code&&this.address){
                    return true;
                }else{
                    return 'disabled'
                }
                // return this.phone?false:'disabled'
            }
        },
        methods:{
            showDel:function(value){
                this.clear=value
            },
            hideDel:function(){
                this.clear=""
            },
            del:function(val){
                if(val=='phone'){this.phone='';return;}
                if(val=='code'){this.code='';return;}
                if(val=='address'){this.address='';return;}
            }
        }
    }
</script>
<style scoped>
.content{
    background: none;
}
.content .list-block{
    margin-bottom:15px;
}
.list-block .item-title.label{
    width:70px;
}
.code-button{
    width:80px;
    height:30px;
    background:none;
    color: #fe8604;
    border-radius: 15px;
    font-size:12px;
    padding:0;
    margin-top:-2px;
}
.clear-input{
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
.tips{
    font-size: 12px;
    color: #ccc;
    padding:2px 15px;
}
</style>