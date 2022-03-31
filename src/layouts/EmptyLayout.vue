<template>
  <div class="EmptyLayout">
    <router-view/>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {
  mapActions: mapMapActions,
} = createNamespacedHelpers('map')

const {
  mapActions: mapOrderActions,
} = createNamespacedHelpers('order')



export default {
  name: "EmptyLayout",
  mounted() {
    this.getAllLocations()
    this.getCategory()
    this.getCars()
    this.webSocket()

    window.addEventListener('offline', this.updateOnlineStatus);

  },
  methods: {
    ...mapMapActions({
      getAllLocations: 'getAllLocations',
    }),
    ...mapOrderActions({
      getCategory: 'getCategory',
      getCars: 'getCars',
      webSocket: 'webSocket',
    }),
    updateOnlineStatus() {
      if (navigator.onLine) {
        this.webSocket()
      }
      else alert('Соединение потеряно - отсутсвие интернета')
    },


  }
}
</script>

<style scoped>
.EmptyLayout {
  width: 100%;
  height: 100%;
}

</style>
