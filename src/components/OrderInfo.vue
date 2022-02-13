<template>
  <div class="OrderOnfo">

    <a-row type="flex" justify="space-around" class="w-100">


      <a-col class="d-flex-column">
        <div class="title">
          <a-icon type="clock-circle"/>
          {{ $t('Время') }}
        </div>
        {{ order.created_at.split('T')[0] }} <br> {{ order.created_at.split('T')[1].split('.')[0] }}

      </a-col>

      <a-col class="d-flex-column">
        <div class="title">
          <a-icon type="user"/>
          {{ $t('Клиент') }}
        </div>
        {{ order.full_name }}
      </a-col>

      <a-col class="d-flex-column">
        <div class="title">
          {{ $t('Номер заказчика') }}
        </div>
        {{ order.phone_number }}
      </a-col>

      <a-col class="d-flex-column">
        <div class="title">
          {{ $t('Адрес') }}
        </div>
        {{ order.region.region }}
        <br>
        {{ order.address.location }}
      </a-col>

      <a-col class="d-flex-column">
        <div class="title">
          {{ $t('Категория') }}
        </div>
        <div class="d-flex">
          {{ getCategoryByUrl(order.category).name }} -
          {{ getCategoryByUrl(order.category).cost }} сум
        </div>
      </a-col>

      <a-col :span="10" v-if="order.driver">
        <a-row type="flex" justify="space-between">
          <a-col class="d-flex-column">
            <div class="title">
              <a-icon type="user"/>
              {{ $t('Пользователь') }}
            </div>

            {{ fullName }}

          </a-col>

          <a-col class="d-flex-column">
            <div class="title">
              <a-icon type="phone"/>
              {{ $t('Номер телефона') }}
            </div>
            {{ order.driver.username }}
            <br/>
            <div class="" v-if="order.driver.info_driver.phone_number_second != 'null'">
              {{ order.driver.info_driver.phone_number_second }}
            </div>
          </a-col>


          <a-col class="d-flex-column">
            <div class="title">
              <a-icon type="car"/>
              {{ $t('Машина') }}
            </div>

            <div class="d-flex">
              <input type="color" v-model="color" style="width: 25px; margin-right: 5px;" disabled>
              {{ order.driver.info_driver.car_color.name }} -
              {{ order.driver.info_driver.car_name.name }}
              {{ order.driver.info_driver.car_number }}
            </div>

          </a-col>
        </a-row>
      </a-col>

    </a-row>

  </div>
</template>

<script>

import {createNamespacedHelpers} from "vuex";

const {
  mapGetters: mapOrderGetters,
} = createNamespacedHelpers('order')
export default {
  name: "OrderInfo",
  data() {
    return {
      color: this.order.driver.info_driver.car_color.code,
      fullName: this.order.driver.info_driver.last_name + ' ' + this.order.driver.info_driver.first_name + ' ' + this.order.driver.info_driver.second_name
    }
  },
  computed: {
    ...mapOrderGetters({
      getCategoryByUrl: 'getCategoryByUrl'
    })
  },
  props: {
    order: {
      type: Object
    }
  },

}
</script>

<style lang="scss">

.ant-modal {
  width: 80vw !important;
  height: 80vh !important;

  .ant-modal-content {
    height: 100% !important;
  }

  .ant-modal-footer {
    display: none;
  }

}

</style>
<style scoped lang="scss">
.OrderOnfo {
  width: 100%;
  border: 1px solid #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  color: black;


  .d-flex {
    display: flex;
  }

  .d-flex-column {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: bold;
  }
}

</style>
