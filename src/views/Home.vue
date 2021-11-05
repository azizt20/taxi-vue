<template>
  <div class="Home">

    <a-layout class="h-100 w-100">
      <a-layout-header class="header">
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="slider">
          <OrderForm />
        </a-layout-sider>
        <a-layout-content class="content">
          <Map/>
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">
        <Footer/>
      </a-layout-footer>
    </a-layout>

  </div>
</template>

<script>
import Map from "../components/Map";
import Header from "../components/Header";
import OrderForm from "../components/OrderForm";
import Footer from "../components/Footer";

export default {
  name: "Home",
  components: {
    Map,
    Header,
    OrderForm,
    Footer
  },

}
</script>

<style scoped>

.Home {
  height: 100%;
}

.header, .slider, .footer, .content{
background: transparent;
}
.slider{
  width: 400px !important;
}
</style>