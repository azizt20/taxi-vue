<template>
  <div class="OrderOnfo">
    <div v-for="order in orders" :key="order.url"  class="w-100 order d-flex j-c-a">
            <div class="d-flex-column col">
              <div class="title">
                {{ $t('Время') }}
              </div>
              {{ order.created_at.split('T')[0] }} <br> {{ order.created_at.split('T')[1].split('.')[0] }}
            </div>

            <div class="d-flex-column col">
              <div class="title">
                {{ $t('Клиент') }}
              </div>
              {{ order.full_name }}
            </div>

            <div class="d-flex-column col">
              <div class="title">
                {{ $t('Номер заказчика') }}
              </div>
              {{ order.phone_number }}
            </div>

            <div class="d-flex-column col">
              <div class="title">
                {{ $t('Адрес') }}
              </div>
              {{ getlocationByUrl(order.address).location }}
            </div>

            <div class="d-flex-column col">
              <div class="title">
                {{ $t('Категория') }}
              </div>
              <div class="d-flex">
                название: {{ getCategoryByUrl(order.category).name }} <br>
                стоимость: {{ getCategoryByUrl(order.category).cost }} <br>
              </div>
            </div>



            <template v-if="order.receiver">
              <div class="d-flex-column col">
                <div class="title">
                  {{ $t('Пользователь') }}
                </div>

                {{ getUserByUrl(order.receiver).info_driver.last_name + ' ' + getUserByUrl(order.receiver).info_driver.first_name }}

              </div>

              <div class="d-flex-column col">
                <div class="title">
                  {{ $t('Номер телефона') }}
                </div>
                {{ getUserByUrl(order.receiver).username }}
                <br/>
                <div class="" v-if="getUserByUrl(order.receiver).info_driver.phone_number_second != 'null'">
                  {{ getUserByUrl(order.receiver).info_driver.phone_number_second }}
                </div>
              </div>


              <div class="d-flex-column col">
                <div class="title">
                  {{ $t('Машина') }}
                </div>

                <div class="d-flex">
                  <input type="color" v-model="getUserByUrl(order.receiver).info_driver.car_color.code"
                         style="width: 25px; margin-right: 5px;" disabled>
                  {{ getUserByUrl(order.receiver).info_driver.car_color.name }} <br>
                  {{ getUserByUrl(order.receiver).info_driver.car_name.name }}
                  {{ getUserByUrl(order.receiver).info_driver.car_number }}
                </div>
              </div>

              <div  v-if="$route.name === 'driver'" class="d-flex-column col">
                <div class="title">
                  <a-icon type="phone"/>
                  {{ $t('Вернуть деньги') }}
                </div>
                <a-button @click="$emit('cashBack', getCategoryByUrl(order.category).percent)">
                  вернуть
                </a-button>
              </div>
            </template>

    </div>

  </div>
</template>

<script>

import {createNamespacedHelpers} from "vuex";

const {
  mapGetters: mapOrderGetters,
  mapActions: mapOrderActions,
} = createNamespacedHelpers('order')

const {
  mapGetters: mapMapGetters,
} = createNamespacedHelpers('map')
export default {
  name: "OrderInfo",
  props: {
    orders: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapOrderGetters({
      getUserByUrl: 'getUserByUrl',
      getCategoryByUrl: 'getCategoryByUrl'
    }),
    ...mapMapGetters({
      getlocationByUrl: 'getlocationByUrl',
      getRegionByUrl: 'getRegionByUrl'
    })
  },
  mounted() {
    this.getOrders()
    this.getUsers()
  },
  methods: {
    ...mapOrderActions({
      getOrders: 'getOrders',
      getUsers: 'getUsers',
    }),
    order(orderr) {
      return {
        ...orderr,

      }
    },
  }
}
</script>


<style scoped lang="scss">
.OrdersInfo {
  width: 100%;
}

.order {
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
