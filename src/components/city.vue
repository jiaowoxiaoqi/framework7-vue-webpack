<template>
    <div class="content">
       
        <form data-search-list=".list-block-search" data-search-in=".item-title" class="searchbar searchbar-init">
            <div class="searchbar-input">
                <input type="search" placeholder="搜索">
                <a href="javascript:;" class="searchbar-clear"></a>
            </div>
            <a href="javascript:;" class="searchbar-cancel">取消</a>
        </form>
         <!-- Search Bar overlay -->
        <!--<div class="searchbar-overlay"></div>-->
        <!--搜索结果列表 start-->
        <div class="content-block searchbar-not-found">
            <div class="content-block-inner">该城市暂未开通</div>
        </div>
        <!--搜索结果列表 end-->
       
        <div class="content-block-title"  v-show="isActive">上次选择城市</div>
        <div class="content-block shuijv" v-show="isActive">
            <div class="row" >
                <div class="cc" v-if="getCityName.id">{{getCityName.name}}</div>
                <div class="" v-else>暂无</div>
            </div>
        </div>
        <div class="content-block-title" v-show="isActive">已开通城市</div>
         <!--  -->
        <div class="list-block list-block-search searchbar-found shuijv"  v-show="isActive">
            <ul>
                <li :key="item.id" v-for="item in list" @click="selected(item)" :class="['item-content',{disabled:item.type=='disabled'}]">
                    <div class="item-inner">
                        <div class="item-title">{{item.title}}</div>
                        <div class="item-after"><span :class="['icon',{badge : item.id == checkId}]"></span></div>
                    </div>
                </li>
            </ul>
        </div>
        <!--  -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name:'city',
    mounted:function(){
        var th=this;
        // 调用搜索框事件
      f7.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title',
        onEnable:function(){
            th.isActive=false;
        },
        onDisable:function(){
             th.isActive=true;
        }
     });  
    },
    data:function(){
        return {
            list:[
                {
                    'id':'1',
                    'title':'杭州',
                    'time':new Date().getTime(),
                    'type':''
                },
                {
                    'id':'2',
                    'title':'宁波',
                    'time':new Date().getTime(),
                    'type':''
                },
                {
                    'id':'3',
                    'title':'温州',
                    'time':new Date().getTime(),
                    'type':''
                }
            ],
            isActive:true,//搜索框获取焦点隐藏搜索框以外的内容
        }
    },
    computed:{
       ...mapGetters([
        'getCityName'//税局选择
        ]),
        checkId(){
            return this.getCityName.id
        },
    },
    methods:{
        selected:function(item){
             if(item.type=='disabled')return
            this.id=item.id;
            this.$router.back();
            var param={
                name:item.title,
                id:item.id
            }
            this.$store.commit({
                type: 'setSelectCityAction',
                param:param
            })
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
    .content .searchbar{
        background:#e0e0e0;
        z-index: 200
    }
   .content .content-block-inner{
       margin:0;
       padding: 10px 0
    }
    .content a{
        color: #0C8CE9
    }
    .shuijv {
        margin-bottom: 0
    }
    
    .content-block-title+.list-block.shuijv {
        margin-top: 0
    }
</style>