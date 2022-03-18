<template>
  <div class="EditForm">
    <a-form @submit.prevent="submitEdit" class="form">

      <a-form-item>
        <label> {{$t('Выберите локацию')}}
          <a-select size="large" v-model="idLocation" @change="changeLocation" class="select-region"
                    placeholder="Выберите регион">
            <a-select-option v-for="location in getlocations" :key="location.url"
                             :value="location.url">
              {{ location.location }}
            </a-select-option>
          </a-select>
        </label>
      </a-form-item>

      <hr/>



      <a-form-item>
        <label>{{$t('Редактировать название локации')}}
          <a-input v-model="newLocation"  :disabled="!getselectedlocation && !idLocation" size="large"/>
        </label>
      </a-form-item>

      <a-form-item>
        <label> {{$t('Новые координаты локации')}}
          <a-row>
            <a-col span="12">
              <a-input size="large" v-model="coordA" placeholder="не выбрана" style="background: #FFFFFF" disabled/>
            </a-col>
            <a-col span="12">
              <a-input size="large" v-model="coordB" placeholder="не выбрана" style="background: #FFFFFF" disabled/>
            </a-col>
          </a-row>
        </label>
      </a-form-item>


      <a-button @submit.prevent="submitEdit" :disabled="!idLocation" size="large" type="primary" html-type="submit">
        {{$t('Сохранить изменения')}}
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
  name: "EditForm",

  data() {
    return {
      region: '',
      idLocation: '',
      coordA: '',
      coordB: '',
      newRegion: '',
      newLocation: '',
      url: ''
    }
  },
  watch: {
    getselectedlocation: function () {
      this.region = this.getselectedlocation.addr
      this.newRegion = this.getselectedlocation.addr
      this.idLocation = this.getselectedlocation.url
      this.newLocation = this.getselectedlocation.location
      this.coordA = this.getselectedlocation.coordA
      this.coordB = this.getselectedlocation.coordB
      this.url = this.getselectedlocation.url


    },
    getNewCoords: function () {
      this.coordA = this.getNewCoords[0]
      this.coordB = this.getNewCoords[1]
    }

  },

  methods: {
    ...mapMapActions({
      editLocation: 'editLocation'
    }),
    changeRegion() {
      this.idLocation = ""
      this.newLocation = ""
      this.newRegion = this.region
    },
    changeLocation() {
      alert('as')
      this.newLocation = this.getlocationByUrl(this.idLocation).location
      this.newRegion = this.getlocationByUrl(this.idLocation).addr
      this.url = this.getlocationByUrl(this.idLocation).url
      this.coordA = this.getlocationByUrl(this.idLocation).coordA
      this.coordB = this.getlocationByUrl(this.idLocation).coordB
    },
    submitEdit() {
      this.editLocation({
        url: this.url,
        addr: this.newRegion,
        location: this.newLocation,
        coordA: this.coordA,
        coordB: this.coordB,
      });
      this.newRegion = ""
      this.newLocation = ""
      this.idLocation = ""
      this.region = ""
      this.coordA = ""
      this.coordB = ""
      this.url = ""

    }

  },

  computed: {
    ...mapMapGetters({
      getlocations: 'getlocations',
      getselectedlocation: 'getselectedlocation',
      getNewCoords: 'getNewCoords',
      getlocationByUrl: 'getlocationByUrl'
    }),
  },

}
</script>

<style lang="scss" scoped>

.EditForm {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.select-region {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
