<template>
  <div class="Orderform">
    <a-form @submit.prevent="submitOrder" class="form">
      <a-form-item>
        <label>Номер заказа (id)
          <a-input v-model="orderId" disabled="" size="large" id="for-id"/>
        </label>
      </a-form-item>

      <a-form-item>
        <label>Ф.И.О.
          <a-input v-model="clientName" size="large"/>
        </label>
      </a-form-item>


      <a-form-item>
        <label>Номер заказчика
          <a-input v-model="phoneNomber" type="number" size="large">
            <a-input size="large" slot="addonBefore"
                     style="width: 70px; padding: 0; border: none; background: transparent" disabled value="+998"/>
          </a-input>
        </label>
      </a-form-item>

      <a-form-item>
        <label> Выберите регион
          <a-select class="select-region" v-model="region" @change="changeRegion" size="large"
                    placeholder="Выберите регион">
            <a-select-option v-for="region in getregions" :key="region.url" :value="region.url">
              {{ region.region }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>

      <a-form-item>
        <label> Выберите локацию
          <a-select size="large" v-model="idLocation" class="select-region" :disabled="!getselectedlocation && !region"
                    placeholder="Выберите регион">
            <a-select-option v-for="location in getlocationByRegion(this.region)" :key="location.url"
                             :value="location.url">
              {{ location.location }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>

      <a-button @submit.prevent="submitOrder" :disabled="!region || !idLocation || !clientName || !phoneNomber" size="large" type="primary" html-type="submit">
        Оформить заказ
      </a-button>

    </a-form>


  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {
  mapGetters: mapMapGetters,
  mapActions: mapMapActions,
} = createNamespacedHelpers('map')

const {
  mapActions: mapOrderActions
} = createNamespacedHelpers('order')

export default {
  name: "OrderForm",

  data() {
    return {
      clientName: '',
      orderId: Date.now(),
      phoneNomber: '',
      region: '',
      idLocation: '',
    }
  },
  watch: {
    getselectedlocation: function () {
      this.region = this.getselectedlocation.addr
      this.idLocation = this.getselectedlocation.url
    },

  },
  mounted() {
    this.getAllLocations()
  },
  created() {
    this.webSocket()
  },

  methods: {
    ...mapMapActions({
      getAllLocations: 'getAllLocations',
    }),
    ...mapOrderActions({
      createOrder: 'createOrder',
      webSocket: 'webSocket'
    }),
    changeRegion() {
      this.idLocation = ""
    },
    submitOrder() {
      this.createOrder({
        full_name: this.clientName,
        phone_number: "+998" + this.phoneNomber,
        address: this.idLocation,
        receiver: null
      });
      this.clientName = ""
      this.orderId = Date.now()
      this.phoneNomber = ""
      this.region = ""
      this.idLocation = ""

    }

  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
      getregions: 'getregions',
      getselectedlocation: 'getselectedlocation',
      getlocationByRegion: 'getlocationByRegion'
    }),
  },

}
</script>

<style lang="scss" scoped>
.select-region {
  width: 100%;
}

.form {
  padding: 0 20px;
}
</style>