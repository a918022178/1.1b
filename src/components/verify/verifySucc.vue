<template>
  <div class="contentBox">
       <div class="tip">
           <div class="pic">
           </div>
            <p>验证成功!</p>
       </div>
  </div>
</template>

<script>
import { Toast,Indicator,MessageBox } from 'mint-ui'
// import {apiUrl,GetRequest} from '../../common/js/common'
export default {
    data(){
      return{
        
      }
    },
    methods:{
  
   
    },
    created(){
        document.title="我的活动";
    },
    mounted(){
        var that=this;
        setTimeout(function(){
            that.$router.push('/manage')
        }, 1200);
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.contentBox{
        position: absolute;
        height: 100%;
        width:100%;
        background :white;
    }
.tip {
    text-align: center;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
}

p {
    margin-top: 0.16rem;
    fs($font14);
    font-weight: 600;
}

.pic {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    bg('../../assets/icon_02success70x70')
}
</style>




