<template>
  <div class="AddLocations">

    <a-layout class="h-100 w-100">
      <a-layout-header  class="header">
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="slider">
          <LocationForm />
        </a-layout-sider>
        <a-layout-content class="content">
          <Map />
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
import LocationForm from "../components/LocationForm";
import Footer from "../components/Footer";

export default {
  name: "AddLocations",
  components: {
    Map,
    Header,
    LocationForm,
    Footer
  },


}
</script>

<style scoped>

.AddLocations {
  height: 100%;
}

.header, .slider, .footer, .content{
  background: transparent;
}
.slider{
  flex: 0 0 400 !important;
  max-width: 400px !important;
  width: 400px !important;
}
</style>