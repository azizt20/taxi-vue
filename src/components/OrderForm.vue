<template>
  <div class="Orderform">
    <a-form class="form">
      <a-form-item >
      <label>Номер заказа (id)
        <a-input size="large" id="for-id"/>
      </label>
      </a-form-item>

      <a-form-item >
      <label>Ф.И.О.
        <a-input size="large"/>
      </label>
      </a-form-item>


      <a-form-item >
      <label>Номер заказчика
        <a-input size="large">
          <a-input size="large" slot="addonBefore"  style="width: 70px; padding: 0; border: none; background: transparent" disabled  value="+998"/>
        </a-input>
      </label>
      </a-form-item>

      <a-form-item >
      <label> Выберите регион
        <a-select size="large" class="select-region" placeholder="Выберите регион">
          <a-select-option value="raduga">
            Радуга
          </a-select-option>
          <a-select-option value="kosmos">
            Космос
          </a-select-option>
        </a-select>
      </label>
      </a-form-item>


      <a-form-item>
      <label> Выберите локацию
        <a-select size="large" class="select-region" disabled placeholder="Выберите регион">
          <a-select-option value="карзинка">
            карзинка
          </a-select-option>
          <a-select-option value="перекресток">
            перекресток
          </a-select-option>
          <a-select-option value="[41.3082, 69.2598]">
            5 школа
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

  mounted() {
    this.getAllLocations()
  },

  methods: {
    ...mapMapActions({
      getAllLocations: 'getFakeLocations',
    }),
  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
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