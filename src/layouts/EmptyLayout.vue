<template>
<div class="EmptyLayout">
  <router-view/>
</div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {
  mapActions: mapLayoutsActions,
} = createNamespacedHelpers('map')
export default {
  name: "EmptyLayout",
  mounted() {
    this.getAllLocations()
  },
  methods:{
    ...mapLayoutsActions({
      getAllLocations: 'getAllLocations',
    })
  }
}
</script>

<style scoped>
.EmptyLayout{
  width: 100%;
  height: 100%;
}

</style>
