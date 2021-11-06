<template>
<div class="Header ">
<router-link class="link" style="padding: 5px 10px; margin: auto 20px" to="add">Добавить локацию</router-link>
<router-link class="link" style="padding: 5px 10px; margin: auto 20px" to="/">Оформить заказ</router-link>

</div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.Header{
  text-align: center;
  height: 100%;
}

</style>