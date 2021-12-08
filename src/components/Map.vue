<template>
  <div class="yandex-map">
    <yandex-map class="yandex-map" zoom="12" :coords=newCoords @click="onClick">

      <div v-for="info in getlocations" :key="info.url">
        <ymap-marker
            :marker-id="info.url"
            :coords=[info.coordA,info.coordB]
            :icon="defoultMarkerIcon(info)"
            @click="selectLocation(info)"
        />
      </div>
      <div v-if="$route.name == 'addLocations' || $route.name == 'editLocations'">
        <ymap-marker v-if="newCoords"
                     marker-id="newCoordsId"
                     :coords="newCoords"
                     :icon="markerIcon"
        />
      </div>


    </yandex-map>
  </div>

</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {yandexMap, ymapMarker} from 'vue-yandex-maps'

const {
  mapGetters: mapMapGetters,
  mapActions: mapMapActions,
  mapMutations: mapMapMutations,

} = createNamespacedHelpers('map')

export default {
  name: "Map",
  components: {yandexMap, ymapMarker},
  data() {
    return {
      selecredLocation: "",
      newCoords: [41.3082,69.2598],
      markerIcon: {
        layout: 'default#imageWithContent',
        imageSize: [43, 43],
        imageOffset: [-22, -43],
        contentOffset: [0, 15],
        contentLayout: '<div style="background: red; position: absolute; font-size: 10px; top: 0; left: 0; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      },
    }

  },

  mounted() {
    this.getAllLocations()
  },

  methods: {
    onClick(e) {
      this.newCoords = e.get('coords');
      this.setCoord(this.newCoords)

    },

    ...mapMapActions({
      getAllLocations: 'getAllLocations',
    }),
    ...mapMapMutations({
      selectlocation: 'SET_SELECTED_LOCATION',
      setCoord: 'SET_NEW_COORDS'
    }),

    selectLocation(info) {
      this.selectlocation(info)
    },

    defoultMarkerIcon({location, id}) {
      return {...this.markerIcon, id, content: location}
    },


  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
    }),

  },


}
</script>

<style scoped>
.yandex-map {
  height: 100%;
}
</style>