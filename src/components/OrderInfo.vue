<template>
<div class="OrderOnfo">
  {{order.full_name}}
  {{order.phone_number}}
  {{order.created_at}}
  {{order.address}}
  {{order.receiver}}
</div>
</template>

<script>
export default {
  name: "OrderInfo",
  props: {
    order: {
      type: Object
    }
  }
}
</script>

<style scoped>
.OrderOnfo{
  border: 1px solid #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.02);
  margin-bottom: 20px;
}

</style>