<template>
  <div class="yandex-map">
    <yandex-map class="yandex-map" zoom="12" :coords="coords" @click="onClick">
      <ymap-marker
          marker-id="123"
          :coords="coords"
          :icon="markerIcon"
      />

      <ymap-marker v-if="newCords"
          marker-id="newcords"
          :coords="newCords"
          :icon="markerIcon"
      />
    </yandex-map>
  </div>

</template>

<script>
// import {createNamespacedHelpers} from 'vuex'
import {yandexMap, ymapMarker} from 'vue-yandex-maps'

export default {
  name: "Map",
  components: {yandexMap, ymapMarker},
  data() {
    return {
      coords: [41.3082, 69.2598],
      newCords: null,
      markerIcon: {
        layout: 'default#imageWithContent',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        content: '123 v12',
        contentOffset: [0, 15],
        contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      }
    }

  },
  methods: {
    onClick(e) {
      this.newCords = e.get('coords');
    }
  }
}
</script>

<style scoped>
.yandex-map{
  height: 100%;
}
</style>