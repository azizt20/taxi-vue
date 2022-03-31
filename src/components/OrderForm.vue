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
        <label> {{ $t('Выберите локацию') }}
          <div class="certain-category-search-wrapper" style="width: 300px">
            <a-auto-complete
                id="location"
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: 'auto' }"
                size="large"
                style="width: 100%"
                placeholder="Выберите локацию"
                option-label-prop="value"
                v-model="location"

            >
              <template slot="dataSource">

                <a-select-option  v-for="location in searchByLocation(location)"
                                 :key="location.url"
                                 :value="location.location"
                @click="selectFromAll(location)">
                  {{ location.location }}
                </a-select-option>


              </template>
              <a-input>
                <a-icon slot="suffix" type="search" class="certain-category-icon"/>
              </a-input>
            </a-auto-complete>

          </div>
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

      <a-button @submit.prevent="submitOrder"
                :disabled="!idLocation || !phoneNomber || !idCategory" || navigator.offLine
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
      idLocation: '',
      location: '',
      idCategory: '',
    }
  },
  watch: {
    getselectedlocation: function () {
      this.idLocation = this.getselectedlocation.url
      this.location = this.getselectedlocation.location
    },

    location: function () {
      this.idLocation = ''
      this.searchByLocation(this.location)
      if (this.getlocationByName(this.location)){
        this.idLocation = this.getlocationByName(this.location).url
      }
    }

  },

  created() {
    setInterval(this.getDateTime, 1000)
  },

  methods: {

    ...mapOrderActions({
      createOrder: 'createOrder',
    }),
    selectFromAll(location){
      this.idLocation = location.url
    },
    changeRegion() {
      this.idLocation = ""
    },
    submitOrder() {
      if (!this.clientName) {
        this.clientName = 'Не указано'
      }
      this.createOrder({
        full_name: this.clientName,
        phone_number: "+998" + this.phoneNomber,
        address: this.idLocation,
        category: this.idCategory,
        receiver: null
      });
      this.clientName = ""
      this.orderId = Date.now()
      this.phoneNomber = ""
      this.location = ""
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
      searchByLocation: 'searchByLocation',
      getselectedlocation: 'getselectedlocation',
      getlocationByRegion: 'getlocationByRegion',
      getlocationByName: 'getlocationByName'
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
