<script setup>

</script>

<template>
  <div class="foot-bar">
    <div class="foot-bar-inner">
      <div class="foot-left">
        <div class="logo">
          <img src="../assets/images/下雪.png" class="logo-img" style="height: 30px;width: 30px">
          <p class="logo-name">容嬷嬷的留言板</p>
        </div>
        <p class="top-p">容嬷嬷的留言板由本人独自开发，可留言，可吐槽。</p>
        <p class="top-p">各位可将留言便签贴在留言墙上，可以自定义便签内容以及颜色等属性，不仅可以用于社交交流，更是一场记录。</p>
        <p class="state">
          <span>声明</span>
          <span>以上网站仅开发者个人专属，未经允许，不可用作其他商业用途</span>
        </p>
      </div>
      <div class="link">
        <p class="title">链接</p>
        <div class="link-inner">
          <a href="http://www.baidu.com" target="_blank" class="link-name">百度</a>
          <a href="http://www.baidu.com" target="_blank" class="link-name">百度</a>
        </div>
      </div>
      <div class="foot-right">
        <p class="title">王子请打赏</p>
        <div class="right-inner">
          <div>
            <img src="../assets/images/rmm1.png" class="logo-img">
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="../assets/images/五阿哥.png" class="logo-img">
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../style/common.less";

.foot-bar {
  width: 100%;
  height: 200px;
  background: @gray-1;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 30px;

  .foot-bar-inner {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    p{
      color:rgba(255,255,255,0.5)
    }
  }

  .foot-left {
    .logo {
      display: flex;
      margin-bottom: 24px;
      align-items: center;
      .logo-name {
        font-size: 20px;
        color: @gray-10;
        font-weight: 600;
        padding-left: 10px;
      }
    }
    .top-p{
      font-size: @size-12;
      padding-bottom: 4px;
      width: 400px;
    }
    .state{
      font-size: @size-12;
      padding-top: 26px;
      span{
        padding-right: 20px;
      }
    }
  }
  .link{
    padding: 0 40px;
    margin-left: 120px;
    flex: 1;
    .link-inner{
      a{
        color:rgba(255,255,255,0.5);
        padding-right: @padding-20;
        font-size: @size-12;
      }
    }
    .title{
      font-size: @size-14;
      padding-bottom: 12px;
    }
  }
  .foot-right{
    .right-inner{
      display: flex;
      img{
        width: 100px;
        height: 100px;
        padding-right: 40px;
      }
      .ds-title{
        font-size: @size-12;
        padding-top: 8px;
      }
    }
  }
}
</style>