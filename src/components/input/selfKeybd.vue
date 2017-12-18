<template>
    <div class="self-key">
        <ul>
            <li v-for="item in keyList">
                <button @click="btn(item)">{{item}}</button>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                keyList:[1,2,3,4,5,6,7,8,9,0,'X','DEL']
            }
        },
        methods:{
            btn:function(val){
                this.$emit('child-click',val)
            }
        }
    }
</script>
<style scoped>
    .self-key {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff
    }
</style>