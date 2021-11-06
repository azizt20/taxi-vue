<template>
  <div class="yandex-map">
    <yandex-map class="yandex-map" zoom="12" :coords=[41.3082,69.2598] @click="onClick">

      <div v-for="info in getlocations" :key="info.id">
        <ymap-marker
            :marker-id="info.id"
            :coords="info.coord"
            :icon="defoultMarkerIcon(info)"
            @click="selectLocation(info)"
        />
      </div>
        <ymap-marker v-if="newCords"
                     :marker-id="newCordsid"
                     :coords="newCords"
                     :icon="newMarkerIcon"
        />


    </yandex-map>
  </div>

</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {yandexMap, ymapMarker} from 'vue-yandex-maps'

const {
  mapGetters: mapMapGetters,
  mapActions: mapMapActions,
} = createNamespacedHelpers('map')

export default {
  name: "Map",
  components: {yandexMap, ymapMarker},
  data() {
    return {
      selecredLocation: "",
      newCords: null,
      markerIcon: {
        layout: 'default#imageWithContent',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        content: '123 v12',
        contentOffset: [0, 15],
        contentLayout: '<div style="background: red; position: absolute; top: 0; left: 0; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      },
      markerIcon2: {
        layout: 'default#imageWithContent',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        content: '123 v12',
        contentOffset: [0, 15],
        contentLayout: '<div style="background: green; position: absolute; top: 0; left: 0; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      }
    }

  },

  mounted() {
    this.getAllLocations()
  },

  methods: {
    onClick(e) {
      this.newCords = e.get('coords');
    },

    ...mapMapActions({
      getAllLocations: 'getFakeLocations',
    }),

    selectLocation(info) {
      this.selecredLocation = info
    },

    defoultMarkerIcon({location, id}) {
      return {...this.markerIcon, id, content: location}
    },
    newMarkerIcon() {
      return {...this.markerIcon2, content: "new lacations"}
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