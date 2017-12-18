<template>
    <div class="content">
        <div class="list-block">
            <ul>
                <li>
                <div class="item-content">
                    <div class="item-inner">
                    <div class="item-title label">姓<span class="v-hide">空</span>名</div>
                    <div class="item-input">
                        <input type="text" placeholder="用户姓名" readonly :value="getUserInfo.name"/>
                    </div>
                    </div>
                </div>
                </li>
                <router-link :to="{name:'uploadCard'}" class=" item-link" tag="li">
                    
                <div class="item-content">
                    <div class="item-inner">
                    <div class="item-title label">身份证</div>
                    <div class="item-input">
                        <input type="email" placeholder="用户身份证号" readonly  :value="getUserInfo.card"/>
                    </div>
                    </div>
                </div>
                </router-link>            
            </ul>
        </div>
         <div class="list-block">
            <ul>
               <router-link :to="{name:'uploadPhone'}" class=" item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">手机号</div>
                            <div class="item-input">{{getUserInfo.phoneNum}}</div>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{name:'uploadAddress'}" class=" item-link">
                    <div class="item-content ">
                      <div class="item-inner">
                            <div class="item-title label">联系地址</div>
                            <div class="item-input">{{getUserInfo.address}}</div>
                        </div>
                    </div>
                </router-link>               
           </ul>
        </div>
        <div class="content-block">
            <a href="javascript:;" class="button button-big" @click="next">确定</a>
        </div>
        <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
    export default {
        name:'sinfo',
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
                clear:'',
                transitionName:'',
            }
        },
        computed:{
            ...mapGetters([
            'getUserInfo',//获取用户信息
            ]),
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
            del:function(val){
                if(val=='phone'){this.phone='';return;}
                if(val=='code'){this.code='';return;}
                if(val=='address'){this.address='';return;}
            },
            next:function(){
                this.$router.push({name:'details'})
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
        },
        watch:{
             '$route' (to, from) {
                const toDepth = to.path.split('/');
                const fromDepth = from.path.split('/');
                console.log(fromDepth)
                if(toDepth.length>fromDepth.length){
                    this.transitionName='slide-fade';return
                }else if(fromDepth.length>2){
                    console.log('0')
                    this.transitionName='slide-out';return
                }
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
.content .list-block .item-input{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


</style>