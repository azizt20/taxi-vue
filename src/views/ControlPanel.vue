<template>
  <div class="ControlPanel">

    <a-layout class="h-100 w-100">
      <a-layout-header class="header">
        <Header/>
      </a-layout-header>
      <a-layout-content class="content">
        <Panel/>
      </a-layout-content>
      <a-layout-footer class="footer">
        <Footer/>
      </a-layout-footer>
    </a-layout>

  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Panel from "../components/Panel";

export default {
  name: "ControlPanel",
  components: {
    Header,
    Panel,
    Footer
  },
}
</script>

<style scoped>

.ControlPanel {
  height: 100%;
  background: transparent;
}

.header, .slider, .footer, .content {
  background: transparent;
}

</style>