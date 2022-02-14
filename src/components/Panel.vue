<template>
  <div class="Panel">

    <a-row class="w-100 content">
      <a-col :lg="{ span: 6, offset: 2 }">

        <h3>
          {{ $t('Создание новой категории') }}
        </h3>
        <a-form @submit.prevent="createCategory" class="form">
          <a-checkbox-group class="w-100" v-model="cars">
            <div class="chackbox-div" v-for="car in getAllCars" :key="car.url">
              <a-checkbox class="chackbox" :value="car.url">
                {{ car.name }}
              </a-checkbox>
            </div>
          </a-checkbox-group>
          <label>Название категории
            <a-input size="large" v-model="name" placeholder="Введите название категории" style="background: #FFFFFF"/>
          </label>
          <div class="d-flex">
            <label>Стоимость
              <a-input size="large" type="number" v-model="cost" placeholder="Введите стоимость"
                       style="background: #FFFFFF"/>
            </label>

            <label>Процент
              <a-input size="large" type="number" v-model="percent" placeholder="Введите процент"
                       style="background: #FFFFFF"/>
            </label>
          </div>

          <a-button @submit.prevent="createCategory" :disabled="!name || !cars || !cost || !percent" size="large" type="primary"
                    html-type="submit">{{ $t('создать') }}
          </a-button>
        </a-form>
      </a-col>


      <a-col :lg="{ span: 6, offset: 1 }">
        <h3>
          {{ $t('Изменение прежних категорий') }}
        </h3>
        <a-form @submit.prevent="editCategory" class="form">
          <a-form-item>
            <label> {{ $t('Выберите категорию') }}
              <a-select class="select-region" v-model="chooseCategory" size="large"
                        placeholder="Выберите категорию">
                <a-select-option v-for="category in getAllCategory" :key="category.url" :value="category.url">
                  {{ category.name }}
                </a-select-option>
              </a-select>
            </label>
          </a-form-item>

          <a-checkbox-group class="w-100" v-model="categotyCars">
            <div class="chackbox-div" v-for="car in getAllCars" :key="car.url">
              <a-checkbox class="chackbox" :value="car.url">
                {{ car.name }}
              </a-checkbox>
            </div>
          </a-checkbox-group>
          <label>Новое название категории
            <a-input size="large" v-model="editName" placeholder="Введите название категории"
                     style="background: #FFFFFF"/>
          </label>

          <div class="d-flex">
            <label>Стоимость
              <a-input size="large" type="number" v-model="editCost" placeholder="Введите стоимость"
                       style="background: #FFFFFF"/>
            </label>

            <label>Процент
              <a-input size="large" type="number" v-model="editPercent" placeholder="Введите процент"
                       style="background: #FFFFFF"/>
            </label>


          </div>
          <a-button @submit.prevent="editCategory" :disabled="!editName || !categotyCars || !chooseCategory || !editCost || ! editPercent"
                    size="large"
                    type="primary" html-type="submit">{{ $t('обновить') }}
          </a-button>
        </a-form>
      </a-col>


      <a-col :lg="{ span: 6, offset: 1 }">
        <h3>
          {{ $t('Добавление новых машин') }}
        </h3>

        <a-form @submit.prevent="createCar" class="form">
          <label> {{ $t('добавить машину') }}
            <a-input size="large" v-model="newCar" placeholder="Введите название машины" style="background: #FFFFFF"/>
          </label>
          <a-button @submit.prevent="createCar" :disabled="!newCar" size="large"
                    type="primary" html-type="submit">{{ $t('создать') }}
          </a-button>
        </a-form>


        <h3>
          {{ $t('Добавление новых цветов') }}
        </h3>
        <a-form @submit.prevent="createColor" class="form">

          <label>{{ $t('Введите цвет') }}
            <a-input size="large" v-model="colorName" placeholder="Введите название цвета" style="background: #FFFFFF"/>

          </label>
          <label> {{ $t('Введите код цвета или выберите из палитры') }}
            <input type="text" class="ant-input ant-input-lg" v-model="colorCode">
            <input type="color" class="ant-input ant-input-lg" v-model="colorCode">
          </label>


          <a-button @submit.prevent="createColor" :disabled="!colorName" size="large"
                    type="primary" html-type="submit">{{ $t('создать') }}
          </a-button>

          <div v-for="color in getAllColors" :key="color.url">
            <label style="margin: 0"> {{ color.name }}</label>
            <input style="margin-left: 10px" type="color" :value="color.code" disabled>

          </div>
        </a-form>
      </a-col>
    </a-row>


  </div>
</template>


<script>


import {createNamespacedHelpers} from "vuex";

const {
  mapGetters: mapOrderGetters,
  mapActions: mapOrderActions,
} = createNamespacedHelpers('order')


export default {
  name: "Panel",
  data() {
    return {
      cars: [],
      name: '',
      cost: '',
      percent: '',
      chooseCategory: '',
      editName: '',
      editCost: '',
      editPercent: '',
      categotyCars: [],
      newCar: '',
      colorCode: '#000000',
      colorName: '',
    }
  },
  watch: {
    chooseCategory: function () {
      this.categotyCars = this.getCategoryByUrl(this.chooseCategory).car
      this.editName = this.getCategoryByUrl(this.chooseCategory).name
      this.editCost = this.getCategoryByUrl(this.chooseCategory).cost
      this.editPercent = this.getCategoryByUrl(this.chooseCategory).percent
    }
  },
  mounted() {
    this.getColors()
  },

  methods: {
    ...mapOrderActions({
      postCategory: 'postCategory',
      postCar: 'postCar',
      putCategory: 'putCategory',
      getColors: 'getColors',
      postColor: 'postColor',
    }),
    createCategory() {
      this.postCategory({
        name: this.name,
        car: this.cars,
        percent: this.percent,
        cost: this.cost
      });
      this.name = ""
      this.cars = []
      this.percent = ""
      this.cost = ""
    },
    editCategory() {
      this.putCategory({
        url: this.chooseCategory,
        name: this.editName,
        car: this.categotyCars,
        percent: this.editPercent,
        cost: this.editCost,
      })
      this.editName = ""
      this.categotyCars = []
      this.chooseCategory = ""
      this.editPercent = ""
      this.editCost = ""
    },
    createCar() {
      this.postCar({
        name: this.newCar
      })
      this.newCar = ''
    },
    createColor() {
      this.postColor({
        name: this.colorName,
        code: this.colorCode,
      })
      this.colorName = ''
      this.colorCode = '#000000'
    }
  },
  computed: {
    ...mapOrderGetters({
      getAllCars: 'getAllCars',
      getAllCategory: 'getAllCategory',
      getCategoryByUrl: 'getCategoryByUrl',
      getAllColors: 'getAllColors',
    }),

  }
}
</script>

<style lang="scss" scoped>
.Panel {
  height: 100%;
  background: #FFFFFF;
  display: flex;
  padding: 20px 50px 40px;
  font-size: 16px;
  overflow-y: scroll;

  .form {
    padding-bottom: 30px;
  }


  label, input {
    font-weight: bold;
    font-size: 18px;
    margin: 10px 0;
  }

  button {
    margin-top: 10px;
  }

  h3 {
    font-weight: bold;
    font-size: 25px;
    color: #2c3e50;
    padding: 40px 0 0;
  }

  .chackbox-div {
    text-align: start;

    .chackbox {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 16px;
    }
  }


}

</style>
