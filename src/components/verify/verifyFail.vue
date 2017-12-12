<template>
    <div class="contentBox">
        <div class="tip">
            <img src="../../assets/icon_fail70x70@3x.png" alt="">
            <p>该券已失效!</p>
        </div>
        <!-- <input type="text" autofocus="autofocus" > -->
    </div>
</template>

<script>
import { apiUrl, GetRequest } from "../../common/js/common.js";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    document.title = "我的活动";
  }
};
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

img {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
}
input{
    text-indent 2em;
    margin-left 10px;
    background-color red;
}
</style>


