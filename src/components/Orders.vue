<template>
  <div class="Orders">

    <template>
      <a-tabs default-active-key="1" size="large" style="padding: 0 40px">
        <a-tab-pane key="1">
            <span slot="tab">
        <a-icon type="transaction"/>
        {{ $t('Заказы') }}
      </span>
          <h2>{{ $t('Информация о заказах') }}</h2>

          <a-tabs default-active-key="1" size="large">
            <a-tab-pane key="1" style>
            <span slot="tab">
              <a-icon type="sync" spin/>
              {{ $t('Поиск водителя') }}
            </span>
              <h2>Список заказов в поисках водителя </h2>
              <div v-for="order in getOrdersByStatus(waiting)" :key="order.url">
                <OrderInfo :order="orderr(order)"/>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" style>
            <span slot="tab">
              <a-icon type="sync" spin/>
              {{ $t('В пути к клиенту') }}
            </span>
              <h2>Спаиок заказов которые ожидают водителя </h2>
              <div v-for="order in getOrdersByStatus(inProgress)" :key="order.url">
                <OrderInfo :order="orderr(order)"/>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" style>
            <span slot="tab">
              <a-icon type="sync" spin/>
              {{ $t('У клиента') }}
            </span>
              <h2>Спаиок заказов которые которые ожидают клиента </h2>
              <div v-for="order in getOrdersByStatus(ImHere)" :key="order.url">
                <OrderInfo :order="orderr(order)"/>
              </div>
            </a-tab-pane>
            <a-tab-pane key="4">
                    <span slot="tab">
              <a-icon type="dingding"/>
              {{ $t('В пути') }}
            </span>
              <h2>Спаиок заказов которые в пути </h2>
              <div v-for="order in this.getOrdersByStatus(go)" :key="order.url">
                <OrderInfo :order="orderr(order)"/>
                <br/>
              </div>
            </a-tab-pane>
            <a-tab-pane key="5">
                    <span slot="tab">
              <a-icon type="check-circle"/>
              {{ $t('Законченный') }}
            </span>
              <h2>Спаиок заказов которые завершены </h2>
              <div v-for="order in this.getOrdersByStatus(done)" :key="order.url">
                <OrderInfo :order="orderr(order)"/>
              </div>
            </a-tab-pane>
          </a-tabs>


        </a-tab-pane>
        <a-tab-pane key="2">
            <span slot="tab">
        <a-icon type="car"/>
        {{ $t('Водители') }}
      </span>
          <h2>Информация о водителях</h2>

          <div v-for="driver in getAllUsers" :key="driver.url">
            <DriverInfo :driver="driver"/>
          </div>
        </a-tab-pane>
      </a-tabs>
    </template>


  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {
  mapGetters: mapMapGetters,
} = createNamespacedHelpers('map')

const {
  mapActions: mapOrderActions,
  mapGetters: mapOrderGetters,
} = createNamespacedHelpers('order')

import DriverInfo from "./DriverInfo";
import OrderInfo from "./OrderInfo";

export default {
  name: "Orders",
  components: {
    DriverInfo,
    OrderInfo
  },
  data() {
    return {
      waiting: "waiting",
      inProgress: "inProgress",
      go: "go",
      ImHere: "ImHere",
      done: "done",
    }
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
    orderr(orderr) {
      return {
        ...orderr,
        driver: this.getUserByUrl(orderr.receiver),
        address: this.getlocationByUrl(orderr.address),
        region: this.getRegionByUrl(this.getlocationByUrl(orderr.address).addr)
      }
    },
    onChange(value) {
      this.dataSource = this.getSearchUsers(value);
    },
  },
  computed: {
    ...mapOrderGetters({
      getAllOrders: 'getAllOrders',
      getAllUsers: 'getAllUsers',
      getSearchUsers: 'getSearchUsers',
      getOrdersByStatus: 'getOrdersByStatus',
      getUserByUrl: 'getUserByUrl',
      getUserById: 'getUserById',
    }),
    ...mapMapGetters({
      getlocationByUrl: 'getlocationByUrl',
      getRegionByUrl: 'getRegionByUrl'
    })
  }
}
</script>

<style scoped lang="scss">
.Orders {
  height: 100%;
  overflow-y: scroll;
  background: #FFFFFF;
}

h2, h3 {
  font-weight: bolder;
  color: black;
}

</style>
