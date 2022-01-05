<template>
  <div class="Coords">
    <yandex-map class="yandex-map" zoom="10" :coords=coord>

      <ymap-marker
          marker-id="newCoordsId"
          :coords="coord"
          :icon="markerIcon"
      />

    </yandex-map>
  </div>
</template>

<script>
import {yandexMap, ymapMarker} from "vue-yandex-maps";

export default {
  name: "Coords",
  components: {
    yandexMap, ymapMarker
  },
  data() {
    return {}
  },
  props: {
    coord: {
      type: Object
    }
  },
}
</script>

<style scoped>
.Coords, yandex-map {
  width: 100%;
  height: 100%;
}

</style>