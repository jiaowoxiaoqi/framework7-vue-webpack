<template>
<div class="content">
        <div class="content-block-title">发票抬头</div>
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">付款方名称</div>
                            <div class="item-input">
                                <input type="text" placeholder="请输入付款方名称或6位极速代码">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">企业税号</div>
                            <div class="item-input">
                                <input type="text" placeholder="请输入付款方企业税号">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 发票明细 -->
        <!--<form >-->
        <transition-group tag="form" name="slide" mode="out-in">
        <div v-for="(item, index) in list" :key="item">
            <div class="content-block-title">
                发票明细{{index+1}}<i class="iconfont icon-jian" v-show="list.length>1" @click="delDetails(index)"></i>
            </div>
            <div class="list-block">
                <ul>
                    <li class="item-link" :class="{'picker-type':index==0}">
                        <div class="item-content disabled">
                            <div class="item-inner">
                                <div class="item-title label">征收品项目</div>
                                <div class="item-input picker-name clear-input" >
                                    <!--{{}}-->
                                    <span class="disabled" v-if="pickerDisplay">{{pickerDisplay}}</span>
                                    <span class="disabled c-gray " v-else>请选择征收品项目</span>
                                </div>
                                <input type="hidden" :value="pickerShuilv" v-model="pickerShuilv">
                                <input type="hidden" :value="pickerDisplay" v-model="pickerDisplay">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">名称</div>
                                <div class="item-input clear-input">
                                    <input type="text" name="" v-model="item.name" placeholder="请输入商品名称" @focus="showDel('name'+index)" @blur="hideDel">
                                    <a href="javascript:;" class="iconfont icon-error" v-show="item.name&&clear=='name'+index" @click="item.name=''"></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">规格型号</div>
                                <div class="item-input clear-input">
                                    <input type="text" v-model="item.specification" placeholder="请输入规格型号" @focus="showDel('specification'+index)" @blur="hideDel">
                                    <a href="javascript:;" class="iconfont icon-error" v-show="item.specification&&clear=='specification'+index" @click="item.specification=''"></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">计量单位</div>
                                <div class="item-input clear-input">
                                    <input type="text" v-model="item.unit" placeholder="请输入计量单位" @focus="showDel('unit'+index)" @blur="hideDel">
                                    <a href="javascript:;" class="iconfont icon-error" v-show="item.unit&&clear=='unit'+index" @click="item.unit=''"></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">数量</div>
                                <div class="item-input clear-input">
                                    <self-input type="number" v-model.lazy="item.count" placeholder="请输入数量" :param="'count'+index"  @child-focus="showDel" @child-blur="hideDel"></self-input>
                                    <!--<input type="number" v-model="item.count" placeholder="请输入数量" @focus="showDel('count'+index)" @blur="hideDel"  @input="countValue($event.target.value)">-->
                                    <a href="javascript:;" class="iconfont icon-error" v-show="item.count&&clear=='count'+index" @click="item.count=''"></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">单价</div>
                                <div class="item-input clear-input">
                                    <self-input type="number" v-model.lazy="item.price" placeholder="请输入含税价格" :param="'price'+index"  @child-focus="showDel" @child-blur="hideDel"></self-input>
                                    <!--<input type="number" v-model="item.price" placeholder="请输入含税价格" @focus="showDel('price'+index)" @blur="hideDel" @input="countValue($event.target.value)" >-->
                                    <a href="javascript:;" class="iconfont icon-error" v-show="item.price&&clear=='price'+index" @click="item.price=''"></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition-group>
        <!--</form>-->
        <!-- 发票明细 -->
        <div class="content-block add">
            <a href="javascript:;" :class="addDisabled" @click="add">
                <i class="iconfont icon-add c-org"></i>
                <span class="">添加明细</span>
            </a>
        </div>
        <div class="list-block price-count">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">价税合计</div>
                        <div class="item-after c-red" ><span class="c-red">￥</span><span  class="c-red">{{sehj}}</span></div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">增值税额</div>
                        <div class="item-after"><span class="c-red">￥</span><span  class="c-red">{{zzse}}</span></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block txt-c">
                <a href="javascript:;" class="button button-big" :class="disabled" @click="save">确定</a>
                <span> 我已阅读</span><router-link :to="{name:'word',param:{type:0}}">《开票须知》</router-link>
        </div>
        <div class="mui-backdrop" v-show="backdrop"></div>
</div>
</template>
<script>
import utils from '../assets/js/util';
import selfInput from './input/numberInputs'
export default {
        name:'details',
        mounted(){
            var th=this;
            th.requestData('./static/type.json','',function(res){
                // th.typeList=res.data.zmpt;
                var arr=res.data.zmpt;
                for(var i=0;i<arr.length;i++){
                    (function(i){
                         th.typeList[i]=arr[i].name;
                         th.typeSlv[i]=arr[i].id
                    })(i)
                }
            });
            th.pickerDevice = f7.picker({
                toolbarTemplate:'<div class="toolbar">\
                                        <div class="toolbar-inner">\
                                            <div class="left">\
                                                <a href="javascript:;"><i class="iconfont icon-icon1"></i></a>\
                                                <a href="javascript:;"><i class="iconfont icon-icon1"></i></a>\
                                            </div>\
                                            <div class="right">\
                                                <button  class="button close-picker" >完成</button>\
                                            </div>\
                                        </div>\
                                        </div> ',
                    input: '.picker-type',
                    cssClass:'user-pick',
                    cols: [{
                            textAlign: 'center',
                            values: th.typeSlv,
                            displayValues:th.typeList
                    }],
                    onClose:function(e){
                        th.backdrop="";
                        let col=e.cols[0];
                        th.pickerDisplay=col.displayValue;
                        th.pickerShuilv=col.value;
                        if(th.pickerDisplay=='劳务'){
                            f7.modal({text:'因支付宝单笔支付金额不能超过1万元，征收品目为劳务的发票单张开票金额不能超过45000元',buttons:[{
                                text:'我知道了',
                                close:true
                            }]})
                        }
                    },
                    onOpen: function (picker) {
                        th.backdrop="show";
                        let index=picker.cols[0].activeIndex,colValues = picker.cols[0].values,len=colValues.length;
                        if(index==(len-1)){Dom7('.icon-icon1').addClass('disabled')}
                        picker.container.find('.icon-icon1').on('click',function(){
                            index=picker.cols[0].activeIndex;
                            var nextCol= colValues[index+1];
                            picker.setValue([nextCol]);
                             if(index==(colValues.length-2)){
                                 Dom7(this).addClass('disabled')
                             }
                        })
                    }
            });
        },
        components:{selfInput},
        data:function(){
            return {
                clear:'',
                // disabled:'',
                list:[{
                    // type:'',
                    name:'',
                    specification:'',
                    unit:'',
                    count:'',
                    price:''
                }],
                typeList:[],
                typeSlv:[],
                pickerDisplay:'',
                pickerShuilv:'',
                backdrop:'',//遮罩
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
            },
            sehj:function(){
                let i=0,len=this.list.length,se=0;
                for(i=0;i<len;i++){
                    se +=Number(this.list[i].price)*Number(this.list[i].count)
                }
                return se
               // return this.list[0].price
            },
            zzse:function(){
                let i=0,len=this.list.length,se=0;
                for(i=0;i<len;i++){
                    se +=Number(this.list[i].price)*Number(this.list[i].count)
                }
                return se
            },
            addDisabled:function(){
                let len=this.list.length;
                if(len>=8){
                    return 'disabled'
                }else{
                    return ''
                }
            }
        },
        methods:{
            add:function(){
                    let obj={
                        // type:'',
                        name:'',
                        specification:'',
                        unit:'',
                        count:'',
                        price:''
                    };
                this.list.push(obj)
                // if(this.list.length>=7){
                //     this.disabled="disabled"
                // }
            },
            countValue:function(val){
                    var result = utils.parse(val)
            },
            save:function(){
                console.log(this.list)
            },
            showDel:function(value){
                this.clear=value
            },
            hideDel:function(){
                this.clear=""
            },
            delDetails:function(index){
                var th=this;
                if(th.list.length==1){return}
                const text="确定要删除开票明细"+(index+1)+"吗？";
                const buttons=[
                    {
                        text:'取消',
                        close:true
                    },{
                        text:'确定',
                        onClick:function(){
                            console.log(th.list.length)
                            th.list.splice(index, 1)
                        }
                    }
                ];
                f7.modal({text,buttons})
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
    }
    .content .list-block {
        margin: 0;
    }
    .list-block .item-title.label {
        width: 80px;
        font-size: 15px;
    }
    .button-big{margin-bottom: 10px}
    .clear-input {
        box-sizing: border-box;
        padding: 0 8px;
        overflow: hidden;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .list-block input[type=number],
    .list-block input[type=text],.picker-name,item-input input[type=text]{
        font-size: 14px;
        width:95%
    }
    .price-count  .item-inner:after{height: 0}
    .tips {
        font-size: 12px;
        color: #ccc;
        padding: 2px 15px;
    }
    input {
        color: #030303
    }
    input::placeholder,
    input::-webkit-input-placeholder {
        color: #ccc
    }
    .content .icon-error{width:22px;display: inline-block;vertical-align: middle}
    .add {
        text-align: center;
        margin: 10px 0;
        background: #fff;
        padding: 10px 0;
    }
    .item-content.disabled{opacity: 1}
    .mui-backdrop{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999
    }
    .add a {
        color: #030303;
        font-size: 16px;
        line-height: 25px;
    }
    .icon-jian {
        position: absolute;
        right: 15px;
        font-size: 18px;
        color: #F4333C
    }
.slide-enter-active, .slide-leave-active {
  transition: all .5s
}
.slide-enter,.slide-leave-active{
  opacity: 0;
  transform: translateX(30px);
}
</style>