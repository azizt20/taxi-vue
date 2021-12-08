<template>
  <div class="OrdersInfo">

    <a-layout class="h-100 w-100">

      <a-layout-header class="header">
        <Header/>
      </a-layout-header>

      <a-layout-content class="content">
        <Orders />
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
import Orders from "../components/Orders";

export default {
  name: "OrdersInfo",
  components: {
    Header,
    Footer,
    Orders
  },


}
</script>

<style scoped>

.OrdersInfo {
  height: 100%;
}

.header, .slider, .footer, .content {
  background: transparent;
}

.slider {
  flex: 0 0 400 !important;
  max-width: 400px !important;
  width: 400px !important;
}
</style>