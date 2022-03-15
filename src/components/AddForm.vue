<template>
  <div class="AddForm">

    <a-form class="form" @submit.prevent="submitLocation">

      <a-form-item>
        <label> {{$t('Название локации')}}
          <a-input size="large" v-model="location"/>
        </label>
      </a-form-item>


      <a-form-item>
        <label> {{ $t('Координаты локации') }}
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

      <a-button size="large" type="primary" :disabled="!coordA || !location"  @submit.prevent="submitLocation" html-type="submit">
        {{$t('Добавить новую локацию')}}
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
      createLocation: 'addLocation',

    }),
    submitLocation() {
      this.createLocation({
        location: this.location,
        addr: this.getregions[0].url,
        coordA: this.coordA,
        coordB: this.coordB
      });
      this.location = ""
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
