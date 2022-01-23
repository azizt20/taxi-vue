<template>
  <div class="DriverInfo">

    <div class="d-flex-column">
      <div class="title">
        <a-icon type="user"/>
        {{$t('Пользователь')}}
      </div>

      {{fullName}}

    </div>

    <div class="d-flex-column">
      <div class="title">
        <a-icon type="phone"/>
        Номер телефона
      </div>
      {{ driver.username }}
      <br/>
      <div class="" v-if="driver.info_driver.phone_number_second != 'null'">
        {{ driver.info_driver.phone_number_second }}
      </div>
    </div>


    <div class="d-flex-column">
      <div class="title">
        <a-icon type="car"/>
        {{$t('Машина')}}
      </div>
      {{ driver.info_driver.car_color }}
      {{ driver.info_driver.car_name }}
    </div>

    <div class="d-flex-column">
      <div class="title">
        <a-icon type="number" />
        {{$t('Номер авто')}}
      </div>
      {{ driver.info_driver.car_number }}
    </div>


    <div class="d-flex-column">
      <div class="title">
        <a-icon type="calendar" />
        {{$t('Зарегистрирован')}}
      </div>
      {{date}} - {{time}}
    </div>

  </div>
</template>

<script>
export default {
  name: "DriverInfo",
  data(){
    return{
      date: this.driver.date_joined.split('T')[0],
      time: this.driver.date_joined.split('T')[1].split('.')[0],
      fullName: this.driver.info_driver.last_name + ' ' + this.driver.info_driver.first_name + ' ' + this.driver.info_driver.second_name
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

  .d-flex{
    display: flex;
  }
  .d-flex-column {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    color: black;

    .title{
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid black;
      font-weight: bold;
    }
  }
}

</style>