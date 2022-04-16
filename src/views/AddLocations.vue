<template>
  <div class="AddLocations">

    <a-layout class="h-100 w-100">
      <a-layout-header  class="header">
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="slider">
          <AddForm />
        </a-layout-sider>
        <a-layout-content class="content">
          <Map />
        </a-layout-content>
      </a-layout>

    </a-layout>

  </div>
</template>

<script>
import Map from "../components/Map";
import Header from "../components/Header";
import AddForm from "../components/AddForm";

export default {
  name: "AddLocations",
  components: {
    Map,
    Header,
    AddForm,
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

.header{
  padding: 0;
}
.slider{
  flex: 0 0 400 !important;
  max-width: 400px !important;
  width: 400px !important;
}
</style>