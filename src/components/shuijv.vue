<template>
    <div class="content">
        <div class="content-block-title" v-show="guizhe">上次选择税局</div>
        <div class="content-block shuijv" v-show="guizhe">
            <div class="row">
                <div class="cc" v-if="getShuiName.id">{{getShuiName.name}}</div>
                <div class="cc" v-else>暂无</div>
            </div>
        </div>
        <div class="content-block-title">其他税局</div>
        <div class="list-block shuijv">
            <ul>
                <li :key="item.id" v-for="item in list" @click="selected(item)" :class="['item-content',{disabled:item.type=='disabled'}]">
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
import { mapGetters } from 'vuex'
export default {
    name:'shuijv',
    data:function(){
        return {
            list:[
                {
                    'id':'1',
                    'title':'税局1',
                    'time':new Date().getTime(),
                    'type':''
                },
                {
                    'id':'2',
                    'title':'税局2',
                    'time':new Date().getTime(),
                    'type':''
                },
                {
                    'id':'3',
                    'title':'税局3',
                    'time':new Date().getTime(),
                    'type':''
                }
            ],
            guizhe:true
        }
    },
    computed:{
       ...mapGetters([
        'getShuiName',//税局选择
        'getIsShowWord'//税局选择
        ]),
        checkId(){
            return this.getShuiName.id
        }
    },
    methods:{
        selected:function(item){
             if(item.type=='disabled')return;
             var id=this.checkId;
             var localShowWord=this.getIsShowWord;
            var param={
                name:item.title,
                id:item.id
            };
            this.$store.commit({
                type: 'setSelectShuiAction',
                param:param
            });
            if(item.id!=id||!localShowWord){
                this.guizhe=false;
                this.$router.push({name:'word',param:{type:0}});
            }else{
                this.$router.back();
            }

        }
    }
}  
</script>
<style type="text/css">
    .cc {
        padding: 5px 10px;
        text-align: center;
        color: #fe8604;
        border: 1px solid #fe8604;
        margin: 0 5px 10px
    }
.shuijv.content-block{
    margin-bottom:0
}
 .content-block-title+.list-block.shuijv{
        margin-top:0
    }
</style>
    