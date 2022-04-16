<template>
  <div class="EditLocations">

    <a-layout class="h-100 w-100">
      <a-layout-header class="header">
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="slider">
          <EditForm />
        </a-layout-sider>
        <a-layout-content class="content">
          <Map/>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <div class="res">
      <EditForm />
    </div>

  </div>
</template>

<script>
import Map from "../components/Map";
import Header from "../components/Header";
import EditForm from "../components/EditForm";

export default {
  name: "EditLocations",
  components: {
    Map,
    Header,
    EditForm,
  },


}
</script>

<style scoped lang="scss">

.EditLocations {
  height: 100%;
}

.header, .slider, .footer, .content {
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
