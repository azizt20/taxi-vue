<template>
  <div class="EditLocations">

    <a-layout class="h-100 w-100">
      <a-layout-sider class="slider">
        <EditForm />
      </a-layout-sider>
      <a-layout>
      <a-layout>

        <a-layout-header class="header">
          <Header/>
        </a-layout-header>
        <a-layout-content class="content">
          <Map/>
        </a-layout-content>

      </a-layout>

      <a-layout-footer class="footer">
        <Footer/>
      </a-layout-footer>
    </a-layout>
    </a-layout>

  </div>
</template>

<script>
import Map from "../components/Map";
import Header from "../components/Header";
import EditForm from "../components/EditForm";
import Footer from "../components/Footer";

export default {
  name: "EditLocations",
  components: {
    Map,
    Header,
    EditForm,
    Footer
  },


}
</script>

<style scoped>

.EditLocations {
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