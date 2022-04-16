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

.res{
  display: flex !important;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
}
.no-res {
display: none !important;
}
@media (min-width: 576px) {
  .d-sm-none {
    display: none;
  }
  .d-sm-flex {
    display: flex;
  }
}

@media (min-width: 768px) {
  .d-md-none {
    display: none ;
  }
  .d-md-flex {
    display: flex;
  }
}

@media (min-width: 992px) {
  .d-lg-none {
    display: none ;
  }
  .d-lg-flex {
    display: flex;
  }

  .res{
    display: none !important;
  }
  .no-res{
    display: flex !important;
  }
}

.h-100 {
  height: 100%;
}

.w-100 {
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

.ant-layout-content {
  border: 1px solid rgba(70, 64, 64, 0.72);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.d-flex {
  display: flex;
}

.d-none {
  display: none !important;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.j-c-s {
  justify-content: start;
}

.j-c-c {
  justify-content: center;
}

.j-c-e {
  justify-content: end;
}

.j-c-b {
  justify-content: space-between;
}

.j-c-a {
  justify-content: space-around;
}

.a-i-s {
  align-items: start;
}

.a-i-c {
  align-items: start;
}

.a-i-e {
  align-items: end;
}

</style>
