<template>
    <div class="content">
        <div class="list-block">
            <ul>
                <li :key="item.id" v-for="item in list" @click="selected(item)"  :class="['item-content',{disabled:item.type=='disabled'}]">
                    <div class="item-inner">
                        <div class="item-title">{{item.title}}</div>
                        <div class="item-after"><span :class="['icon',{badge : item.id == checkId}]"></span></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapMutations } from 'vuex';
export default {
    name:'fapiao',
    props:[''],
    created () {
    // 组件创建完后获取数据，
        // f7.showIndicator();
        console.log('ff')
    },
    data:function(){
        return {
            list:[
                {
                    'id':'1',
                    'title':'发票抬头1',
                    'time':new Date().getTime(),
                    'type':'disabled'
                },
                {
                    'id':'2',
                    'title':'发票抬头2',
                    'time':new Date().getTime(),
                    'type':'disabled'
                },
                {
                    'id':'3',
                    'title':'发票抬头3',
                    'time':new Date().getTime(),
                    'type':''
                }
            ]
        }
    },
    computed:{
        checkId(){
            return this.$store.getters.getFaPiaoType.id
        }
    },
    methods:{
        selected:function(item){
            if(item.type=='disabled')return
            // this.id=item.id;
            var param={
                name:item.title,
                id:item.id
            };
            this.$store.commit({
                type: 'setSelectFaPiaoAction',
                param:param
            });
            this.$router.back();
        }
    }
}  

</script>


<style type="text/css">
</style>