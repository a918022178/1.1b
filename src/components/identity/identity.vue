<template>
  <div class="contentBox">
      <div class="msgBox">
            <div class="form">
                <div class="telphone common">
                    <span>手机号</span><input autofocus @keyup="keyup" v-model="tel" type="text" placeholder="请输入11位手机号码">
                </div>
                <div class="pw common">
                    <span>密码</span><input @keyup="keyup" v-model="pass" type="password" placeholder="请输入密码">
                </div>
                <div class="sub">
                    <button @click="btn" :class="{'color':color}">登录</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,setCookie} from "../../common/js/common.js";
import { Indicator,Toast } from "mint-ui";

export default {
  data() {
    return {
      tel: "",
      pass: "",
      color: 0
    };
  },
  created() {
    // this.user_id=getCookie('src_user_id')
  },
  mounted() {
    if(getCookie('user_id')){
      this.$router.push('/manage')
      return
      // setCookie('user_id',getCookie('user_id'),3*24*3600*1000)
    }
      document.title = "身份验证";
  },
  methods: {
    verify(){
        console.log(111111111111)
        var that = this;
        // Indicator.open('加载中...');
        var params={
              token:123,
              account:that.tel,
              password:that.pass
            },
            url=apiUrl+"/peony/merchant/identityVerify";
            this.$http.post(url,params,{emulateJSON:true}).then(function(res){
                console.log(params)
              if(res.body.code==0){
                  Toast({
                    message: '登录成功',
                    duration: 500,
                    });
                    setCookie('user_id',res.body.data.result[0].user_id,(3*24*3600*1000))
                    setCookie('shop_id',res.body.data.result[0].shop_id,(3*24*3600*1000))
                    setTimeout(() => {
                        that.$router.push('/manage')
                    }, 600);
              }else if(res.body.code==-1){
                //   Indicator.close();
                  Toast(res.body.msg)
              }
          })
      },
    keyup() {
      if (this.tel.trim() && this.pass.trim()) {
        this.color = 1;
      } else {
        this.color = 0;
      }
    },
    btn(e) {
      if (this.color) {
        if (!/^1[34578]\d{9}$/.test(this.tel)) {
          Toast("手机号错误");
        } else {
            this.verify()
            // Toast("登录成功");
        }
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
@import './identity.styl';
</style>




