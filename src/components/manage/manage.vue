<template>
    <div class="contentBox manage">
        <div class="head"> 
            <div class="msg">
                <img class="fl" :src="result.shop_logo" alt="">
                <div class="fl">          
                    <p class="name"><span>{{result.shop_name}}</span><s @click="quit"></s></p>
                    <p class="price">余额:<b>{{result.order_total_price}}.00</b> 元</p>
                </div>
                <!-- <a href="javascript:;" @click="rout"><i class="fr"></i></a> -->
                <router-link to="/identifyNum"><i class="fr"></i></router-link>
                <!-- <a href="http://test.shijian666.com/merchant/#/identifyNum"><i class="fr"></i></a> -->
            </div>
            <div class="count">
                <div>
                    <p>总订单数</p>
                    <p class="number">{{result.order_total}}</p>
                </div>
                <div>
                    <p>待使用</p>
                    <p class="number">{{result.order_not_used}}</p>
                    <i></i>
                </div>
                <div class="last">
                    <p>已使用</p>
                    <p class="number">{{result.order_already_use}}</p>
                    <i></i>
                </div>
            </div>
        </div>
        <div class="lists" v-for="(v,i) in order_list" :key="i">
            <div class="list">
                <div class="num">
                    <div class=" left fl">
                        <img :src="v.face" alt="">
                        <span>{{v.nickname}}</span>
                    </div>
                    <div class="right fr">订单编号：{{v.order_id}}</div>
                </div>
                <div class="picBox">
                    <!-- class used:已使用，unused:未使用 -->
                    <div class="pic"><img :src="v.photo" alt=""><i :class="{'unused':v.status==2,'used':v.status==3}"></i></div>
                    <div class="txt">
                        <div>{{v.title}}</div>
                        <span>￥{{v.price}}.00</span>
                    </div>
                </div>
                <div class="msgBox">
                    <div class="num common">
                        <div class="left fl">使用时间</div>
                        <div class="right fr">{{v.service_time}}</div>
                        
                    </div>
                </div>
            </div>
        </div>
        <mt-actionsheet
        :actions="actions"
        :value="actions[0]"
        v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,setCookie,setCookie1} from "../../common/js/common.js";
import { Indicator,Actionsheet,MessageBox   } from 'mint-ui';
import wx from 'weixin-js-sdk'

export default {
    data(){
        return{
            result:'',
            order_list:[],
            actions:[{name:'退出登录(切换帐号)',method:this.exit}],
            sheetVisible:false
        }
    },
    mounted(){
        setCookie('tag1',1)
    },
    methods:{
        getMyCoupons(){
          Indicator.open('加载中...');
        
        },
        init(){
            var that = this;
            Indicator.open('加载中...');
            var params={
              token:123,
              user_id:getCookie('user_id'),
              shop_id:getCookie('shop_id')
            },
            url=apiUrl+"/peony/merchant/manageCenter";
            this.$http.post(url,params,{emulateJSON:true}).then(function(res){
              if(res.body.code==0){
                  that.result=res.body.data.result[0];
                  that.order_list=that.result.order_list;
                  Indicator.close();
              }else if(res.body.code==-1){
                  Indicator.close();
                  Toast(res.body.msg)
              }
          })
        },
        quit(){
            this.sheetVisible=true;
            console.log(document.querySelector('.mint-actionsheet-listitem'))
        },
        exit(){
            var that = this;
            MessageBox.confirm(
            '确定退出登录(切换帐号)',
            '温馨提示',
            {showCancelButton: true}
                ).then(action=>{
                setCookie('user_id','')
                that.$router.push('/')
            }).catch(cancel=>{
                console.log(cancel)
            });
        },
        rout(){
            location.href='http://test.shijian666.com/merchant/#/identifyNum'
        }
   
    },
    created(){
        document.title="管理中心";
        this.init()
    }
}
</script>

<style lang="stylus" scoped>
// @import '../../common/stylus/variable.styl'
@import './manage.styl'

</style>
<style lang="stylus">
.manage{
    .mint-actionsheet{
        .mint-actionsheet-listitem,.mint-actionsheet-button{
            font-size 15px!important;
        }
        .mint-actionsheet-listitem{
            color:red!important;
        }
    }
}
.v-modal{
    opacity:.3!important;    
}
.mint-msgbox-btns{
    height 49px
    line-height 49px
}
.mint-msgbox-btn{
    font-size 15px
}
.mint-msgbox{
    border-radius 0.1rem    
}
.mint-msgbox-content{
    padding: 5px 20px 20px;  
}
</style>


