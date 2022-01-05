<template>
  <div class="AddForm">
    <a-form @submit.prevent="submitRegion" class="form">
      <a-form-item >
        <label>Добавить район
          <a-input-search placeholder="Название района" size="large" v-model="addRegion" >
            <a-button slot="enterButton" type="primary" @submit.prevent="submitRegion" html-type="submit">
              Добавить
            </a-button>
          </a-input-search>
        </label>
      </a-form-item>
    </a-form>


    <a-form class="form" @submit.prevent="submitLocation">
      <a-form-item >
        <label> Выберите регион
          <a-select class="select-region" v-model="region" size="large" placeholder="Выберите регион">
            <a-select-option v-for="region in getregions" :key="region.url" :value="region.url">
              {{ region.region }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>


      <a-form-item>
        <label> Название локации
          <a-input size="large" v-model="location"/>
        </label>
      </a-form-item>


      <a-form-item>
        <label> Координаты локации
          <a-row>
            <a-col span="12">
              <a-input size="large" v-model="coordA" placeholder="не выбрана" style="background: #FFFFFF"  disabled/>
            </a-col>
            <a-col span="12">
              <a-input size="large" v-model="coordB" placeholder="не выбрана" style="background: #FFFFFF"  disabled/>
            </a-col>
          </a-row>
        </label>
      </a-form-item>

      <a-button size="large" type="primary" :disabled="!coordA || !region || !location"  @submit.prevent="submitLocation" html-type="submit">
        Добавить новую локацию
      </a-button>
    </a-form>


  </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'

const {
  mapGetters: mapMapGetters,
  mapActions: mapMapActions,
} = createNamespacedHelpers('map')

export default {
  name: "AddForm",
  data(){
    return{
      location: "",
      addRegion: "",
      region: "",
      coordA: "",
      coordB: "",
    }
  },
  watch: {
    getNewCoords: function () {
      this.coordA = this.getNewCoords[0]
      this.coordB = this.getNewCoords[1]
    }
  },
  methods: {
    ...mapMapActions({
      createRegion: 'addRegion',
      createLocation: 'addLocation',

    }),
    submitRegion() {
      this.createRegion({
        region: this.addRegion
      })
      this.addRegion = ""
    },
    submitLocation() {
      this.createLocation({
        location: this.location,
        addr: this.region,
        coordA: this.coordA,
        coordB: this.coordB
      });
      this.location = ""
      this.region = ""
      this.coordB = ""
      this.coordA = ""
    }
  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
      getregions: 'getregions',
      getNewCoords: 'getNewCoords',
    }),
  },

}
</script>

<style lang="scss" scoped>
.AddForm {
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
}
.form {
  padding: 0 20px;
}


</style>
