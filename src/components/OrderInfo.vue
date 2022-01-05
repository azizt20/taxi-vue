<template>
  <div class="OrderOnfo">
    <div class="d-flex-column">
      <a-modal v-model="visible" title="Выбранный адрес">
<Coords :coord="coord"/>
      </a-modal>
      <div class="title">
        Клиент
      </div>
      {{ order.full_name }}
    </div>

    <div class="d-flex-column">
      <div class="title">
        Номер заказчика
      </div>
      {{ order.phone_number }}
    </div>

    <div class="d-flex-column">
      <div class="title">
        Адрес
      </div>
      {{ order.region.region }}
      {{ order.address.location }}
    </div>

    <div class="d-flex-column">
      <div class="title">
        Координаты
      </div>
      <div class="d-flex" @click="showModal(order.address.coordA, order.address.coordB)">
        <a-icon type="link"/>
        Посмотреть на карте
      </div>

    </div>

    {{ order.driver }}


    {{ order.created_at }}

  </div>
</template>

<script>
import Coords from "./Coords";
export default {
  name: "OrderInfo",
  components:{
    Coords
  },
  data() {
    return {
      visible: false,
      coordA: '',
      coordB: '',
      coord:[this.coordA, this.coordB]
    }
  },
  props: {
    order: {
      type: Object
    }
  },
  methods: {
    showModal(A, B) {
      this.coordA = A
      this.coordB = B
      this.visible = true;
    },

  }

}
</script>

<style lang="scss">

.ant-modal {
  width: 80vw !important;
  height: 80vh !important;

  .ant-modal-content {
    height: 100% !important;
  }
  .ant-modal-footer{
    display: none;
  }

}
</style>
<style scoped lang="scss">
.OrderOnfo {
  border: 1px solid #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  display: flex;
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