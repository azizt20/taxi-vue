<template>
  <div class="Driver d-flex j-c-a">
    <div class="certain-category-search-wrapper" style="width: 300px">
      <a-auto-complete
          id="driverNumber"
          class="certain-category-search"
          dropdown-class-name="certain-category-search-dropdown"
          :dropdown-match-select-width="false"
          :dropdown-style="{ width: '300px' }"
          size="large"
          style="width: 100%"
          placeholder="Номер водителя"
          option-label-prop="value"
          v-model="phone"
      >
        <template slot="dataSource">
          <a-select-option v-for="data in dataSource" :key="data.username" :value="data.username">
            {{ data.username }}
          </a-select-option>

        </template>
        <a-input>
          <a-icon slot="suffix" type="search" class="certain-category-icon"/>
        </a-input>
      </a-auto-complete>
    </div>

    <div class="certain-category-search-wrapper" style="width: 300px">
      <a-auto-complete
          id="carNumber"
          class="certain-category-search"
          dropdown-class-name="certain-category-search-dropdown"
          :dropdown-match-select-width="false"
          :dropdown-style="{ width: '300px' }"
          size="large"
          style="width: 100%"
          placeholder="Номер водителя"
          option-label-prop="value"
          v-model="carNumber"
      >
        <template slot="dataSource">
          <a-select-option v-for="data in dataSource" :key="data.username" :value="data.info_driver.car_number">
            {{ data.info_driver.car_number }}
          </a-select-option>

        </template>
        <a-input>
          <a-icon slot="suffix" type="search" class="certain-category-icon"/>
        </a-input>
      </a-auto-complete>
    </div>

  </div>
</template>

<script>


import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapOrderActions,
  mapGetters: mapOrderGetters,
} = createNamespacedHelpers('order')

export default {
  name: "DriverForm",
  data() {
    return {
      phone: '',
      carNumber: '',
      dataSource: [],
    }
  },
  computed: {
    ...mapOrderGetters({
      getSearchUsers: 'getSearchUsers',
    }),
  },
  watch: {
    phone: function () {
      this.dataSource = this.getSearchUsers(this.phone)
      if (this.dataSource.length === 1 && this.dataSource[0].username === this.phone) {
        this.carNumber = this.dataSource[0].info_driver.car_number
      }
    }
  },
  mounted() {
    this.getUsers()
    document.querySelector('#driverNumber input').setAttribute('type', 'number')
  },
  methods: {
    ...mapOrderActions({
      getUsers: 'getUsers',
    }),
  },
}
</script>

<style lang="scss" scoped>
.Driver {
  height: 100%;
  width: 100%;
  padding: 100px;
}

</style>