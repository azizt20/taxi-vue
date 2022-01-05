<template>
  <div class="DriverInfo">
    {{ driver.info_driver.first_name }}
    {{ driver.info_driver.last_name }}
    {{ driver.info_driver.second_name }}
    {{ driver.date_joined }}
    {{ driver.username }}
    {{ driver.info_driver.phone_number_second }}
    {{ driver.info_driver.car_name }}
    {{ driver.info_driver.car_color }}
    {{ driver.info_driver.car_number }}
  </div>
</template>

<script>
export default {
  name: "DriverInfo",
  props: {
    driver: {
      type: Object
    }
  }
}
</script>

<style scoped>
.DriverInfo{
  border: 1px solid #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.02);
  margin-bottom: 20px;
}

</style>