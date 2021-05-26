<template>
  <div class="app-container">
    <div class="title-container">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  created() {
    const { meta } = this.$route;
    const { title } = meta || {};
    this.title = title;
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  height: 100%;
  padding: 100px 0 0 200px;
  h2 {
    color: #333;
  }
}
</style>
