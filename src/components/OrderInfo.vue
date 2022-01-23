<template>
  <div class="OrderOnfo">

    <a-row type="flex" justify="space-around" class="w-100">


      <a-col class="d-flex-column">
        <div class="title">
          <a-icon type="clock-circle"/>
          {{ $t('Время') }}
        </div>
        {{ date }} <br> {{ time }}

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
          {{ $t('Координаты') }}
        </div>
        <div class="d-flex" @click="showModal(order.address.coordA, order.address.coordB)">
          <a-icon type="link"/>
          {{ $t('Посмотреть на карте') }}
        </div>
      </a-col>

      <a-col :span="7" v-if="order.driver">
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
              {{$t('Машина')}}
            </div>
            {{ order.driver.info_driver.car_color }}
            {{ order.driver.info_driver.car_name }}
            {{ order.driver.info_driver.car_number }}

          </a-col>
        </a-row>
      </a-col>

    </a-row>

  </div>
</template>

<script>

export default {
  name: "OrderInfo",
  data() {
    return {
      date: this.order.created_at.split('T')[0],
      time: this.order.created_at.split('T')[1].split('.')[0],
      fullName: this.order.driver.info_driver.last_name + ' ' + this.order.driver.info_driver.first_name + ' ' + this.order.driver.info_driver.second_name
    }
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
