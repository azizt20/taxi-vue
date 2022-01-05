<template>
<div class="Header ">
  <div></div>
  <row>
    <router-link class="link" style="padding: 5px 10px; margin: auto 20px" to="/">Оформить заказ</router-link>
    <router-link class="link" style="padding: 5px 10px; margin: auto 20px" to="add">Добавить локацию</router-link>
    <router-link class="link" style="padding: 5px 10px; margin: auto 20px" to="edit">Редактировать локации</router-link>
    <router-link class="link" style="padding: 5px 10px; margin: auto 20px" to="orders">Информация о заказах</router-link>
  </row>
  <a-button type="danger"  @click="logoutt">
    Выйти
  </a-button>
</div>
</template>

<script>

import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapAuthActions,
} = createNamespacedHelpers('auth')

export default {
  name: "Header",
  methods: {
    ...mapAuthActions({
      logout: 'logout'
    }),
    logoutt() {
      this.logout()
    }
  }
}
</script>

<style scoped>
.Header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

</style>