<template>
    <div >
        <ul class="list">
            <router-link :key="item.id" v-for="item in list" tag="li" :to="{'name':'ListInfo',query:{id:item.id}}">
                {{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.id}}
            </router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name:'list',
    data () {
        return {
            list:[
                {
                    'id':'1',
                    'title':'发票抬头1',
                    'time':new Date().getTime()
                },
                {
                    'id':'2',
                    'title':'发票抬头2',
                    'time':new Date().getTime()
                },
                {
                    'id':'3',
                    'title':'发票抬头3',
                    'time':new Date().getTime()
                }
            ]
        }
    }
}  

</script>


<style type="text/css">
    .list{
        list-style: none;
    }
    .list>li{
        height:45px;
        line-height: 45px;
        border-bottom: 1px solid #cccccc;
        padding-left:12px;
        font-size: 14px;
    }
</style>