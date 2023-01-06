<template>
  <div class="iconList">
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="icon-item">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-a-tupianyihuifu-15"></use>
    </svg>
    <span>私人FM</span>
    </div>
    <div class="icon-item">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-gedan"></use>
    </svg>
    <span>歌单</span>
    </div>
    <div class="icon-item">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-paihangbang"></use>
    </svg>
    <span>排行榜</span>
    </div>
  </div>

</template>

<script>

</script>

<style lang="less" scoped>
.iconList{
  width: 100%;
  height: 2rem;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon-item{
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon{
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
