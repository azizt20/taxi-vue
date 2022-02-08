<template>
  <div class="Login">

    <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
    >
      <a-form-item>
        <label>{{$t('Логин')}}
        <a-input size="large"
            v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
        </label>
      </a-form-item>
      <a-form-item>
        <label>{{$t('Пароль')}}
          <a-input size="large"
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
        </label>
      </a-form-item>
      <a-form-item>

        <a-button type="primary" html-type="submit" class="login-form-button">
          {{$t('Войти')}}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapAuthActions,
} = createNamespacedHelpers('auth')
export default {
  name: "Login",
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  mounted() {
    this.logout()
  },
  methods: {
    ...mapAuthActions({
      login: "login",
      logout: "logout"
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        this.login(values)
            .then(() => {
              this.$router.push({ name: 'order' })
            })
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>
<style>
.Login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

label{
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: -20px;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>