<template>
  <div class="DriverInfo">

    <div type="flex" class="w-100 row d-flex j-c-a">

      <div class="d-flex-column col">
        <div class="title">
          {{ $t('Пользователь') }}
        </div>

        {{ fullName }}

      </div>

      <div class="d-flex-column col">
        <div class="title">
          {{ $t('Номер телефона') }}
        </div>
        {{ driver.username }}
        <br/>
        <div class="" v-if="driver.info_driver.phone_number_second != 'null'">
          {{ driver.info_driver.phone_number_second }}
        </div>
      </div>


      <div class="d-flex-column col">
        <div class="title">
          {{ $t('Машина') }}
        </div>
        <div class="d-flex">
          <input type="color" v-model="color" style="width: 25px; margin-right: 5px;"  disabled>
          {{ driver.info_driver.car_color.name }} -
          {{ driver.info_driver.car_name.name }}
        </div>
      </div>

      <div class="d-flex-column col">
        <div class="title">
          {{ $t('Номер авто') }}
        </div>
        {{ driver.info_driver.car_number }}
      </div>


      <div class="d-flex-column col">
        <div class="title">
          {{ $t('Зарегистрирован') }}
        </div>
        {{ date }} - {{ time }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DriverInfo",
  data() {
    return {
      color: this.driver.info_driver.car_color.code,
      date: this.driver.date_joined.split('T')[0],
      time: this.driver.date_joined.split('T')[1].split('.')[0],
      fullName: this.driver.info_driver.last_name + ' ' + this.driver.info_driver.first_name
    }
  },
  props: {
    driver: {
      type: Object
    }
  },
}
</script>

<style scoped lang="scss">
.DriverInfo {
  display: flex;
  justify-content: space-around;
  border: 1px solid #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;

  .d-flex {
    display: flex;
  }

  .d-flex-column {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    color: black;

    .title {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid black;
      font-weight: bold;
    }
  }
}



</style>
