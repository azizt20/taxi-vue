<template>
  <div class="OrdersInfo">

    <a-layout class="h-100 w-100">

      <a-layout-header class="header">
        <Header/>
      </a-layout-header>

      <a-layout-content class="content">
        <Orders />
      </a-layout-content>



    </a-layout>

  </div>
</template>

<script>
import Header from "../components/Header";
import Orders from "../components/Orders";

export default {
  name: "OrdersInfo",
  components: {
    Header,
    Orders
  },


}
</script>

<style scoped>

.OrdersInfo {
  height: 100%;
}

.header, .slider, .content {
  background: transparent;
}
.header{
  padding: 0;
}
.slider {
  flex: 0 0 400 !important;
  max-width: 400px !important;
  width: 400px !important;
}
</style>