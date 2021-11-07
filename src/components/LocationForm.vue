<template>
  <div class="LocationForm">

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


    <a-form class="form">
      <a-form-item >
        <label> Выберите регион
          <a-select class="select-region" v-model="region" size="large" placeholder="Выберите регион">
            <a-select-option v-for="region in getregions" :key="region.id" :value="region.region">
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

      <a-button size="large" type="primary" html-type="submit">
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
  mapMutations: mapMapMutations,
} = createNamespacedHelpers('map')

export default {
  name: "LocationForm",
  data(){
    return{
      location: "",
      addRegion: "",
      region: "",
      coordA: "",
      coordB: "",
    }
  },

  mounted() {
    this.getAllLocations()
  },

  methods: {
    ...mapMapActions({
      getAllLocations: 'getFakeLocations',
    }),
    ...mapMapMutations({
      createRegion: 'SET_NEW_REGION',
      createLocation: 'SET_NEW_LOCATION',
    }),
    submitRegion() {
      this.createRegion({
        id: Date.now(),
        region: this.addRegion
      });
      this.addRegion = ""
    },
    submitLocation() {
      this.createLocation({
        id: Date.now(),
        location: this.location,
        region: this.region,
      });
      this.location = ""
    }
  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
      getregions: 'getregions',
    }),
  },

}
</script>

<style lang="scss" scoped>
.LocationForm {
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
}
.form {
  padding: 0 20px;
}


</style>
