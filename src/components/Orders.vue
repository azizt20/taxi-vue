<template>
<div>
<div v-for="order in getAllOrders" :key="order">
{{order}}
</div>
</div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapOrderActions,
    mapGetters: mapOrderGetters
} = createNamespacedHelpers('order')
export default {
  name: "Orders",
  mounted() {
    this.getOrders()
  },
  methods: {
    ...mapOrderActions({
      getOrders: 'getOrders'
    })
  },
  computed: {
    ...mapOrderGetters({
      getAllOrders: 'getAllOrders'
    })
  }
}
</script>

<style scoped>

</style>