<template>
  <div class="Orderform">
    <a-form class="form">
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
          <a-input v-model="phoneNomber" size="large">
            <a-input size="large" slot="addonBefore"
                     style="width: 70px; padding: 0; border: none; background: transparent" disabled value="+998"/>
          </a-input>
        </label>
      </a-form-item>

      <a-form-item>
        <label> Выберите регион
          <a-select class="select-region" v-model="region" @change="changeRegion" size="large" placeholder="Выберите регион">
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

      <a-button size="large" type="primary" html-type="submit">
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

  methods: {
    ...mapMapActions({
      getAllLocations: 'getAllLocations',
    }),
    changeRegion() {
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