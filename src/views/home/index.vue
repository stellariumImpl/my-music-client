<template>
  <div class="home">
    <div class="banner">
      <h1>Welcome to My Music</h1>
      <p>发现好音乐</p>
    </div>
    <!-- 这里可以添加推荐歌单、热门歌曲等内容 -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  .banner {
    padding: 60px 0;
    text-align: center;
    background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
    color: white;

    h1 {
      font-size: 48px;
      margin-bottom: 20px;
    }

    p {
      font-size: 20px;
      opacity: 0.8;
    }
  }
}
</style>