<template>
<div class="Orderform">

  <a-select class="select-region" placeholder="Выберите регион">
    <a-select-option value="raduga">
      Радуга
    </a-select-option>
    <a-select-option value="kosmos">
      Космос
    </a-select-option>
  </a-select>
  <a-input placeholder="Название локации" />

</div>
</template>

<script>
export default {
  name: "OrderForm"
}
</script>

<style scoped>
.select-region{
  width: 100%;
}

</style>