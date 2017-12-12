<template>
  <div class="contentBox">
        <div class="remind">
            <i class="icon"></i>
            <span>输入券码完成验证后，商家可与平台结算费用！</span>
        </div>
        <div  class="code">
            <input autofocus type="txt" placeholder="" v-model="code" @keyup="keyup">
            <div v-if="placeholder" class="placeholder">请输入正确的券码</div>
            <div class="scanBox" @click="getScanConfig">
                <div class="scan"></div>
                <div class="text" id="scan">扫一扫</div>
            </div>
            <div class="sub" @click="verifyCouponCode">
                <button>确认验证</button>
            </div>
        </div>
        <div class="error" v-show="showError">
            输入的券码有误
        </div>
  </div>
</template>

<script>
import { apiUrl, GetRequest, getCookie,setCookie,setCookie1 } from "../../common/js/common";
import { Indicator, Toast } from "mint-ui";
import wx from 'weixin-js-sdk'

export default {
  data() {
    return {
      showError: false,
      code:'',
      data:'',
      placeholder:1,
      show:1
    };
  },
  created() {
    if(!getCookie('user_id')){
      this.$router.push('/')
      return
      // setCookie('user_id',getCookie('user_id'),3*24*3600*1000)
    }
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS && getCookie("tag1")){
        location.reload()
        setCookie('tag1','')
    }
    var that=this;
    document.title = "验证券码";
    var params={
        token:'123',
        user_id:getCookie('user_id'),
        },
        url=apiUrl+"/peony/merchant/getScanConfig";
        that.$http.post(url,params,{emulateJSON:true}).then(function(res){
            if(res.body.code==0){
                that.data = res.body.data.result[0];
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: that.data.appId, // 必填，公众号的唯一标识
                        timestamp:that.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: that.data.nonceStr, // 必填，生成签名的随机串
                        signature:that.data.signature, // 必填，签名，见附录1
                        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    })
                }
        }) 
  },
  mounted() {      
  },
  methods:{
    getScanConfig(){
        var that=this;
            wx.ready(function(){
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function(res) {
                          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                          Indicator.open('验证中...');
                          var params1={
                              token:'adasdas',
                              user_id:getCookie('user_id'),
                                  // user_id:11267,
                              shop_id:getCookie('shop_id'),
                                  // shop_id:144,
                              act_code:result
                            },
                            url1=apiUrl+"/peony/merchant/verifyCouponCode";
                            that.$http.post(url1,params1,{emulateJSON:true}).then(function(res){
                                if(res.body.code==0){
                                  Indicator.close()
                                  that.$router.push('/verifySucc')
                                }else{
                                    Indicator.close()
                                    Toast(res.body.msg)
                                }
                            }) 
                         } 
                    }) 
            })

    },                                 
    verifyCouponCode(){
        if(/^[0-9]*$/.test(this.code)&&this.code.length!=0){
            Indicator.open('验证中...');
            var params={
                token:'adasdas',
                user_id:getCookie('user_id'),
                // user_id:11267,
                shop_id:getCookie('shop_id'),
                // shop_id:144,
                act_code:this.code
                },
                that=this,

                url=apiUrl+"/peony/merchant/verifyCouponCode";

                this.$http.post(url,params,{emulateJSON:true}).then(function(res){
                if(res.body.code==0){
                    Indicator.close();
                    that.$router.push('/verifySucc')
                }else{
                    Indicator.close();
                    Toast(res.body.msg)
                }
            }) 
        }else{
            Toast('券码格式错误')
        }        
      },
      keyup(){
          if(this.code==''){
              this.placeholder=1;
          }else{
              this.placeholder=0;
          }
      }
    }
}
</script>

<style lang="stylus" scoped>
@import './identifyNum.styl';
</style>
<style lang="stylus">
.mint-indicator-spin{
    display block
    padding-left 16px;
}
</style>
