<template>
  <div class="Driver ">
    <div class="w-100 d-flex j-c-a">
      <a-form-item>
        <label> Поиск пользователя по <b>номеру телефона</b>
          <div class="certain-category-search-wrapper" style="width: 300px">
            <a-auto-complete
                id="driverNumber"
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="large"
                style="width: 100%"
                placeholder="Номер водителя"
                option-label-prop="value"
                v-model="phone"

            >
              <template slot="dataSource">
                <a-select-option v-for="data in dataSource" :key="data.username" :value="data.username">
                  {{ data.username }}
                </a-select-option>

              </template>
              <a-input>
                <a-icon slot="suffix" type="search" class="certain-category-icon"/>
              </a-input>
            </a-auto-complete>
          </div>
        </label>
      </a-form-item>

      <a-form-item>
        <label> Поиск пользователя по <b>номеру машины</b>
          <div class="certain-category-search-wrapper" style="width: 300px">
            <a-auto-complete
                id="carNumber"
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="large"
                style="width: 100%"
                placeholder="Номер водителя"
                option-label-prop="value"
                v-model="carNumber"
            >
              <template slot="dataSource">
                <a-select-option v-for="data in dataSource" :key="data.username" :value="data.info_driver.car_number">
                  {{ data.info_driver.car_number }}
                </a-select-option>

              </template>
              <a-input>
                <a-icon slot="suffix" type="search" class="certain-category-icon"/>
              </a-input>
            </a-auto-complete>
          </div>
        </label>
      </a-form-item>
    </div>

    <hr>
    <div v-if="user" class="d-flex">
      <div class="user" style="text-align: start; ">

        <div class="info">Пользователь <b>#{{ user.info_driver.user_id }}</b></div>
        <div class="info">Зарегистрирован по номеру <b>+{{ phone }}</b></div>
        <div class="info">Дата регистрации <b>{{ date }}</b></div>
        <div class="info">Марка машины : <b>{{ car }}</b></div>
        <div class="info">Цвет машины : <b> {{ color.name }}</b></div>
        <div class="info">Номер машины : <b> {{ carNumber }}</b></div>

        <a href='https://api.azizt20.uz/admin/taxi_api/driver/' target="_blank">Изменить через админ панель</a>
          <div class="info"> Баланс пользователя : <b>{{ balance }} сум</b></div>

        <h1 style="margin-top: 50px">Пополнить баланс пользователя</h1>

        <a-form @submit.prevent="submitBalance" class="form" style="align-items: start;">

          <label class="flex-column"> На какую сумму пополнить ?
            <a-input size="large" type="number" style="margin: 20px 0 0" v-model="cash"/>
          </label>

          <a-button @submit.prevent="submitBalance" :disabled="!cash" size="large" type="primary" html-type="submit">
            {{ $t('Пополнить баланс') }}
          </a-button>

        </a-form>


      </div>
      <div class="user">
        <div class="swich">
          <a-switch style="margin-right: 10px" v-model="acces"/>
          <span>Редактировать личные данне пользьзователя</span>
        </div>

        <a-form @submit.prevent="submitEdit" class="form">

          <label class="d-flex"> Фамилия
            <a-input size="large" :class="{'for-edit' : acces}" :disabled="!acces" v-model="las_name"/>
          </label>

          <label class="d-flex"> Имя
            <a-input size="large" :class="{'for-edit' : acces}" :disabled="!acces" v-model="first_name"/>
          </label>

          <label class="d-flex"> Отчество
            <a-input size="large" :class="{'for-edit' : acces}" :disabled="!acces" v-model="second_name"/>
          </label>


          <label class="d-flex"> Номер телефона
            <a-input size="large" :class="{'for-edit' : acces}" :disabled="!acces" v-model="firstNumber"/>
          </label>

          <label class="d-flex"> 2-ой номер телефона
            <a-input size="large" :class="{'for-edit' : acces}" :disabled="!acces" v-model="secondNumber"/>
          </label>

          <a-button @submit.prevent="submitEdit" style="margin-right: 20px" :disabled="!acces" size="large"
                    type="primary" html-type="submit">
            {{ $t('Сохранить изменеия') }}
          </a-button>

        </a-form>
      </div>

    </div>


    <!--    <div v-if="OrdersByDriver(user.url)">-->
    <!--      <div v-for="order in OrdersByDriver(user.url)" :key="order.url">-->
    <!--        <OrderInfo :order="orderr(order)"/>-->
    <!--      </div>-->
    <!--    </div>-->


  </div>
</template>

<script>


import {createNamespacedHelpers} from "vuex";
// import OrderInfo from "./OrderInfo";

const {
  mapActions: mapOrderActions,
  mapGetters: mapOrderGetters,
} = createNamespacedHelpers('order')

const {
  mapGetters: mapMapGetters,
} = createNamespacedHelpers('map')

export default {
  name: "DriverForm",
  components: {
    // OrderInfo
  },
  data() {
    return {
      phone: '',
      carNumber: '',
      dataSource: [],
      user: '',
      firstNumber: '',
      secondNumber: '',
      first_name: '',
      second_name: '',
      las_name: '',
      date: '',
      balance: '',
      color: '',
      car: '',
      cash: '',
      acces: false
    }
  },
  computed: {
    ...mapOrderGetters({
      searchByUsername: 'getSearchUsersByUsername',
      searchByCarNumber: 'getSearchUsersByCarNumber',
      allCars: 'getAllCars',
      OrdersByDriver: 'getOrdersByDriver',
      UserByUrl: 'getUserByUrl',
    }),
    ...mapMapGetters({
      locationByUrl: 'getlocationByUrl',
      RegionByUrl: 'getRegionByUrl'
    })
  },
  watch: {
    phone: function () {
      this.user = ''
      this.dataSource = this.searchByUsername(this.phone)
      if (this.dataSource.length === 1 && this.dataSource[0].username === this.phone) {
        this.carNumber = this.dataSource[0].info_driver.car_number
        if (!this.dataSource[0].info_driver.car_number){
          this.carNumber = ''
        }
        this.user = this.dataSource[0]
      }
    },
    carNumber: function () {
      this.user = ''
      this.dataSource = this.searchByCarNumber(this.carNumber)
      if (this.dataSource.length === 1 && this.dataSource[0].info_driver.car_number === this.carNumber) {
        this.phone = this.dataSource[0].username
        this.user = this.dataSource[0]
      }
    },
    user: function () {
      this.first_name = this.user.info_driver.first_name
      this.second_name = this.user.info_driver.second_name
      this.las_name = this.user.info_driver.last_name
      this.date = this.user.date_joined.split('T')[0] + " " + this.user.date_joined.split('T')[1].split('.')[0]
      this.balance = this.user.info_driver.balance
      this.color = {
        name: this.user.info_driver.car_color.name,
        code: this.user.info_driver.car_color.code
      }
      this.car = this.user.info_driver.car_name.name
      this.secondNumber = this.user.info_driver.phone_number_second
      this.firstNumber = this.user.info_driver.phone_number
    }
  },
  mounted() {
    this.getUsers()
    document.querySelector('#driverNumber input').setAttribute('type', 'number')
  },
  methods: {
    ...mapOrderActions({
      getUsers: 'getUsers',
      Balance: 'patchBalance',
      editInfo: 'patchDriverInfo',
    }),
    submitBalance() {
      this.Balance({
        id: this.user.info_driver.id,
        balance: parseInt(this.balance) + parseInt(this.cash)
      }).then(
          this.balance = parseInt(this.balance) + parseInt(this.cash)
      )
      this.cash = ''
    },
    submitEdit() {
      this.editInfo({
        id: this.user.info_driver.id,
        first_name: this.first_name,
        second_name: this.second_name,
        las_name: this.las_name,
        phone_number: this.firstNumber,
        phone_number_second: this.secondNumber,
      })
    }

    ,
    orderr(orderr) {
      return {
        ...orderr,
        driver: this.UserByUrl(orderr.receiver),
        address: this.locationByUrl(orderr.address),
        region: this.RegionByUrl(this.locationByUrl(orderr.address).addr)
      }
    },
  },

}
</script>


<style lang="scss" scoped>
.Driver {
  height: 100%;
  width: 100%;
  font-size: 20px;
  color: black;
  padding: 100px;
  overflow-y: scroll;

  .user {
    width: 50%;
    padding: 20px 50px;

    .info {
      margin-bottom: 10px;
    }

    .swich {
      display: flex;
      margin: 20px 0;
      justify-content: center;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: end;

      .ant-form-item {
      }

      label {
        font-size: 20px;
        color: black;
        margin-bottom: 20px;
      }

      input, select {
        color: black;
        font-size: 20px;
        margin: 0 20px;
        width: 350px;
      }

      .for-edit {
        border: 1px solid yellowgreen;
      }
    }

  }
}


</style>