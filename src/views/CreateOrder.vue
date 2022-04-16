<template>
  <div class="CreateOrder">

    <a-layout class="h-100 w-100 no-res">
      <a-layout-header class="header">
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="slider">
          <OrderForm/>
        </a-layout-sider>
        <a-layout-content class="content">
          <Map/>
        </a-layout-content>
      </a-layout>

    </a-layout>


    <a-layout class="h-100">
      <br>
      <Header/>
      <div class="res">
        <OrderForm/>
      </div>
    </a-layout>


  </div>
</template>

<script>
import Map from "../components/Map";
import Header from "../components/Header";
import OrderForm from "../components/OrderForm";

export default {
  name: "Order",
  components: {
    Map,
    Header,
    OrderForm,
  },
}
</script>

<style scoped>

.CreateOrder {
  height: 100%;
  background: transparent;

}

.header, .slider, .content{
  background: transparent;
}

.header{
  padding: 0;
}

</style>