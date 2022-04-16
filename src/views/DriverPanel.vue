<template>
  <div class="DriverPanel">

    <a-layout class="h-100 w-100">
      <a-layout-header class="header">
        <Header/>
      </a-layout-header>
      <a-layout-content class="content">
        <DriverForm/>
      </a-layout-content>
    </a-layout>

  </div>
</template>

<script>
import Header from "../components/Header";
import DriverForm from "../components/DriverForm";

export default {
  name: "ControlPanel",
  components: {
    Header,
    DriverForm,
  },
}
</script>

<style scoped>

.DriverPanel {
  height: 100%;
  background: transparent;
}

.header, .slider, .content {
  background: transparent;
}
.header{
  padding: 0;
}
</style>