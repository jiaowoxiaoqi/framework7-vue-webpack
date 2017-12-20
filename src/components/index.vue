<template>
    <div class="content">
        <div class="list-block index">
            <ul>
                <li>
                    <router-link :to="{ name: 'city', params: { id: 'private' }}" class="item-link item-content">
                        <div class="item-inner">
                            <div class="item-title">城市</div>
                            <div v-if="getCityName.name" :class="['active', 'item-after' ]"><span>{{getCityName.name}}</span><input type="hidden" :value="getCityName.id" /> </div>
                            <div v-else="getCityName.name" :class="[ 'item-after' ]">请选择城市</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'shuijv', params: { id: 'private' }}" class="item-link item-content">
                        <div class="item-inner">
                            <div class="item-title">税局</div>
                            <div v-if="getShuiName.name" :class="[ 'active' , 'item-after' ]"><span>{{getShuiName.name}}</span><input type="hidden" :value="getShuiName.id" /> </div>
                            <div v-else="getShuiName.name" :class="['item-after' ]">请选择业务发生地所在税局</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'fapiao', params: { id: 'private' }}" class="item-link item-content">
                        <div class="item-inner">
                            <div class="item-title">发票类型</div>
                            <div v-if="getFaPiaoType.name" :class="['active', 'item-after' ]"><span>{{getFaPiaoType.name}}</span><input type="hidden" :value="getFaPiaoType.id" /> </div>
                            <div v-else="getFaPiaoType.name" :class="['item-after' ]">请选择发票类型</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="content-block txt-c">
            <a @click="next"  :class="['button' ,'button-big' ,{disabled : !isActive}]">立即申请</a>
            <p>委托方：温州市国家税务局 温州市地方税务局</p>
            <router-link :to="{name:'word',param:{type:0}}">《电子发票相关政策》</router-link>
            <!-- type=0电子发票，type=1 -->
        </div>
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">代开发票消息提醒</div>
                        <div class="item-after">
                            <label class="label-switch">
                                <input type="checkbox">
                                <div class="checkbox"></div>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block desc"> 开启发票代开消息提醒为您添加“浙江爱信诺航天信息有限公司”服务窗，代开发票申请审核结果及发票开具通知等相关信息将通过支付宝发送给您。</div>
    </div>
</template>
<script>
    var t="很抱歉！";
    var txt="您所在城市尚未开通此业务，可选择其他城市哦~";
    var btn=[{
            text:'我知道了',
            close:true
    }];
import { mapGetters } from 'vuex'
export default {
    name:'index',
    created(){
            
    },
    mounted:function(){
        const th=this;
        var cityId=th.getCityName.id;
        th.$ajax({
            method: 'get',
            data:{},
            url: './static/index.json'
        }).then(function(re){
            const title=t;
            const text=txt;
            const buttons=btn;
            f7.modal({text,title,buttons})
        }).catch(function(e){
            console.log(e)
        });
    },
    watch:{
        '$router' (to,from){

        }
    },
    data:function(){
        return{
            active:false,

        }
    },
    computed:{
       ...mapGetters([
        'getCityName',//城市选择
        'getShuiName',//税局选择
        'getFaPiaoType',//发票类型
        'getUserInfo',//获取用户信息
        ]),
        isActive(){
            var store=this.$store.getters;
            return store.getFaPiaoType.id && store.getShuiName.id && store.getCityName.id?true:false
        }
    },
    methods:{
        next:function(){
            var th=this;
            if(!this.isActive) return;
            const title="代开人声明"
            const text="本次代开发票提供的开票信息真实、完整、准确，符合有关法律、法规。电子发票一经开具，无法作废！";
            const buttons=[
                {
                    text:'我在想想',
                    close:true
                },{
                    text:'提交',
                    onClick:function(){
                        if(th.getUserInfo.phoneNum){
                            th.$router.push({name:'sinfo'});
                            return;
                        }
                        th.$router.push({name:'winfo'})
                    }
                }
            ];
            f7.modal({text,title,buttons})
        }
    }
} 
</script>


<style scoped>
    .content{
        margin-top:16px;
    }
</style>