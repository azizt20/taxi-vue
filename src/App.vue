<template>
<div id="app">
  <component :is="layout">
    <router-view/>
  </component>
</div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";

export default {
  computed: {
    layout() {
      const layoutType = this.$route.meta.layout || 'main'
      return `${layoutType}-layout`
    }
  },
  components: {
    MainLayout, EmptyLayout
  }
}
</script>

<style lang="scss">
.h-100{
  height: 100%;
}
.w-100{
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
