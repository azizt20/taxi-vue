<template>
  <div class="Orderform">
    <a-form @submit.prevent="submitOrder" class="form">
      <a-form-item>
        <label>{{ $t('Время создания заказа') }}
          <a-input style="text-align: center" v-model="dateTime" disabled="" size="large" id="for-id"/>
        </label>
      </a-form-item>

      <a-form-item>
        <label>{{ $t('Ф.И.О.') }}
          <a-input style="text-align: center" v-model="clientName" size="large"/>
        </label>
      </a-form-item>


      <a-form-item>
        <label>{{ $t('Номер заказчика') }}
          <a-input v-model="phoneNomber" type="number" min="0" size="large">
            <a-input size="large" slot="addonBefore"
                     style="width: 70px; padding: 0; border: none; background: transparent" disabled value="+998"/>
          </a-input>
        </label>
      </a-form-item>

      <a-form-item>
        <label> {{ $t('Выберите регион') }}
          <a-select style="text-align: center" class="select-region" v-model="region" @change="changeRegion"
                    size="large"
                    placeholder="Выберите регион">
            <a-select-option style="text-align: center" v-for="region in getregions" :key="region.url"
                             :value="region.url">
              {{ region.region }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>

      <a-form-item>
        <label> {{ $t('Выберите локацию') }}
          <a-select style="text-align: center" size="large" v-model="idLocation" class="select-region"
                    :disabled="!getselectedlocation && !region"
                    placeholder="Выберите регион">
            <a-select-option style="text-align: center" v-for="location in getlocationByRegion(this.region)"
                             :key="location.url"
                             :value="location.url">
              {{ location.location }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>

      <a-form-item>
        <label> {{ $t('Выберите категорию') }}
          <a-select style="text-align: center" size="large" v-model="idCategory" class="select-region"

                    placeholder="Выберите регион">
            <a-select-option style="text-align: center" v-for="category in getAllCategory"
                             :key="category.url"
                             :value="category.url">
              {{ category.name }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>

      <a-button @submit.prevent="submitOrder" :disabled="!region || !idLocation || !clientName || !phoneNomber"
                size="large" type="primary" html-type="submit">
        {{ $t('Оформить заказ') }}
      </a-button>

    </a-form>

  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {
  mapGetters: mapMapGetters,
} = createNamespacedHelpers('map')

const {
  mapActions: mapOrderActions,
  mapGetters: mapOrderGetters
} = createNamespacedHelpers('order')

export default {
  name: "OrderForm",

  data() {
    return {
      clientName: '',
      dateTime: '',
      phoneNomber: '',
      region: '',
      idLocation: '',
      idCategory: '',

    }
  },
  watch: {
    getselectedlocation: function () {
      this.region = this.getselectedlocation.addr
      this.idLocation = this.getselectedlocation.url
    },

  },

  created() {
    this.webSocket()
    setInterval(this.getDateTime, 1000)
  },

  methods: {

    ...mapOrderActions({
      createOrder: 'createOrder',
      webSocket: 'webSocket'
    }),
    changeRegion() {
      this.idLocation = ""
    },
    submitOrder() {
      this.createCategories({
        full_name: this.clientName,
        phone_number: "+998" + this.phoneNomber,
        address: this.idLocation,
        category: this.idCategory,
        receiver: null
      });
      this.clientName = ""
      this.orderId = Date.now()
      this.phoneNomber = ""
      this.region = ""
      this.idLocation = ""
      this.idCategory = ""

    },

    getDateTime() {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" +
          today.getSeconds();
      const dateTime = time + '   -   ' + date;
      this.dateTime = dateTime;

    }

  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
      getregions: 'getregions',
      getselectedlocation: 'getselectedlocation',
      getlocationByRegion: 'getlocationByRegion'
    }),
    ...mapOrderGetters({
      getAllCategory: 'getAllCategory'
    })
  },

}
</script>

<style lang="scss" scoped>

.Orderform {
  height: 100%;
  display: flex;
  align-items: center;

  .select-region {
    width: 100%;
  }

  .form {
    padding: 0 20px;

    input {
      background: #FFFFFF;
    }
  }
}
</style>
