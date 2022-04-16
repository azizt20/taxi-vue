<template>
  <div class="Header ">
    <div class="no-res">
      <div></div>
      <a-row>
        <router-link class="link" style="padding: 5px 10px; margin: auto 10px" to="create"> {{ $t('Оформить заказ') }}
        </router-link>
        <router-link class="link" style="padding: 5px 10px; margin: auto 10px" to="add"> {{ $t('Добавить локацию') }}
        </router-link>
        <router-link class="link" style="padding: 5px 10px; margin: auto 10px" to="edit">
          {{ $t('Редактировать локации') }}
        </router-link>
        <router-link class="link" style="padding: 5px 10px; margin: auto 10px" to="orders">
          {{ $t('Информация о заказах') }}
        </router-link>
        <router-link class="link" style="padding: 5px 10px; margin: auto 10px" to="panel"> {{ $t('Контроль панель') }}
        </router-link>
        <router-link class="link" style="padding: 5px 10px; margin: auto 10px" to="driver"> {{ $t('Панель водителя') }}
        </router-link>
        <a-select v-model="lang" style="width: 120px" @change="handleChange">
          <a-select-option value="ru">
            Русский <img width="20px" height="20"
                         src="data:image/png;base64,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"
                         alt="">
          </a-select-option>
          <a-select-option value="uz">
            Узбекский <img width="20px" height="20"
                           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA+VBMVEX///8AmbUetTrOESbUABbKAABof5bmm6DMABLQCiW/Ny0AvDsAmLQAlrMAk7EAka/IyMjBwcEAg5/5/v7k5OQAtS0XtzYAiqfd3d3Ozs7u6umbr7XC4en/+vk+qMBetMiv2OKRytja7vL09PT/+f4AnhoAqh4AfZNqlaB4vs/p9fjDy818oKqg0Ny12+TN5+2etaFAn05PjZ0AeZGgsbU/hpdik59ousw4jKBFq8KFxdTVAAAAmhqAqoZZnmM0n0UUmy8/lUyluai0v7WKr45ypHmyvL5dcoq7nJ2pWF2qECG4AACjKTOoPka4HQo6nVRknmwAixZdnWUoHQTjAAAL1UlEQVR4nO1dB3ujOBqGu5vb2zskHBPcA7bjFhJspzr2xqmTbN/N7v//MSfARUj0jsbvM88UEWG9fP2TzHDcAQcccAATOGk1K0c37QuEyd3E+KN9c1Rptk7yXlgCOD5qT67G19W6CAAQEABv/QGAWK9ej68m7aPjvBcZESeNj4vb6zoEgPcCALB+fXvx0SiZPJvtq3EVCJ7ccAigOr5qN/NedkC0Pu6uRW/BuYhTvJ58tPJevh9aN7dVGIHdFrB6e1Ngkga94JrpBqGwJCt31Si66QRQvavkTYdEqz0WE6JnQRy3iyTIxiQx8e0BqpNG3sQ2qFzVE6dnoX51njc5hPPbZNXTDvE2b46VVPlZHPN0Oo3U+Vkc87LH00la9keiPjnNg2C7mhE/A9V25vwa98nHBy+A+2xV9eQiKwXdo36RYYF1Po6ffoaHMM4scmACNMt1AZXtmXCsX2TCrzHeWKAAIOQVdbFQlwoPYYiCF4fDw6FHtjYPxhlY4019Q09Ueh1tOypp0zMAIzgfQVmQhMCKvA9Y7f5av0mZ38mdWd8KUFhp1MWZGp4j6HWIihkoEllDi5q6ewzwLlWHc2zFCMh3na9rZ6H6F0jNxb4kCntNFdCIzilgP4RGoMLpcDcC7lNszp2bQV4Qe24/IHF9NThFodfVdY5TFUXZjizQiMbpPBqyCAkKGplx2n4Ehf/UfGrbNEHA950udnqq6TaUEB223Z16O4l1t7fb+hugbka0/bOrp5ThXJjmAVWHS7MFcjOmHoWKG4JoEuore8MTz4wRaSHu7gN40+K7ELuzmEbYOLmyTHBFX+ooUbyoSZE35i/x2aIhVx2vWcyP1ETbowNXifubk3s3gpoaqTtqLXTFaX0kHoyzgp4Y4mPn3CEeg+FvEqZ4em89zjPqyjSq/Mz79adQ7OLRAeiaoamYNSPOC5HXumQIuU+0ompZlRJYUld6YqyE7QwapofxAWcA8HCJpQFAVQAPQI96kNUEm3EbgoIg0QTj8NukY7Z8z2FE2I2nRXFDkIcd8oqeRRfDHUlRPN0QBFSc6ORLEFFMxBZP7je3E8lMVHKoAjJGEh51RxBQfnSRbSPDEQlQvNrSgGSy1s9bRw2Aq7gEL3bFJxUpQuTYKQLETODauzgLu8QlrQgiRBBjpeHn+44M5WfoEJwT6jGKqeN909fIF+0IUSaFRJDODY5q5JJ450Z5B0+qxdmu96FDjtEjdkR2qHfYTaBOXCTbK4EAdKJEQGkEpe0CdWs49aYI7qIRvME/iMrY9CgMoUbygd0+2YlSObIxCbkzb6OHkTpwDVvjnoqGPp9JQ4CiqHD9OtyXW2ikLnEAGwFopMOpWPfVmKai/BB6Vmn1KH3Usf0pka40LMNtU6and7f9UNA1R6a6rm8JWtbe1/XurhNlfrCERjw/cRye4IVdUygZhk7ZhG1E3RvVtqDuK7vESbEKNGmXTghgYx+65weGD/znxOZSfC1FIdVogUhLzO6gmSitsCoaCIbMOphKCqLh5CTFx+7DRsWTMXEDytNECPjA7LPibtFKBW0PC0oc4agt2ftui4zDhYwL8n5U0kb1TfyB0iJ1yuG7EuiuvRU3wztRyKsskfexcZbUjr9VCKH0tEFtgAKyz006eX8ISh/5yhU+UdSWEC41TKxwuhIB37f1aWYCgNT2Bo1Q/vSemi6QBb4UWksFxWjqQsU2CIxfts4aNJySfcSc5p8k3gcn2KZXb/VucSxD56UC9js+ZOuT0z/kMM0ZIHCVcep0ykIknWkEQ0wbgds2E6fZlCFSu3wFwCQYQdrNGKDVlNqqzR8Bnc2t82w4I4VYPIb8bRCCFZfuBN2oiVRepAsxyDE/FxGi2aQQUyzzIyOAEM9dG0yAamRosHAURf/01FWEaDZZ59vyrYLAV4huVmiCKhJRZeolRdoVOaQSTtmF/zRX+FqihwiND6K212Ye32sSVHKtQCWXL/BUYxlQSbZAnSrygE8T3DkW7j+c3iLV3As3qJF84IxcPVhNifmoqif1SOyTDSwP+MREx3QGX6LDSYye0z6+AAAqb3E+xjfyIDeFWBZqfEdvZjsxZIz0zBND+I1488RQUIqeiU3L99wvpKXIafSRNmF5draYcVNxp8QC3+uturZcD6zQEIo5+7lARSMaXl0Lit5bTUPVap77pg5FBQmg0AfaOElfihBY2Pyc1RPQJG2rYJsukyRJZ9vDQFZTRpK47u4xWDFX4mbbWAtWmxEpqDF6lhhk78LxBtYxH4rkTF8sFUXdOg7RWlkH00Dr2fT3nhFYmaCm7iS0PVGGtW7g0nwOs+AO1aPv5hkq9oBLx3NfFqNdniMaUpzV8a6MYcQSbrWCYMzBe1N83eXEUD24O/UIGHf+s62ligtnjh1ln+VAJC57dg6RPXEcHkKQ5kqaLb81Spi+ffMV9o1pSoiY6Nrk9/cz+6XBZZeMjZrOYw4HLV5Fmoq7eZHrioqGRwfY7/PCDI8OoCctDW+KdTF45K2Xkne71A5XX3MT8myo2utolq/Q+tOVItpPwfR44+jPCneUC4icv22pPRQFxB5+YsicpmINRmGBzBTwYRgCt20Mz3zGAcZBb6vRAh2OeZsDtozHdDr2LA3sfrNNs/2QeQ+H5M4DLslpCCW1LTujg/ph4KKmoZS02HBR07BKWmQ4qmk0JS0oHNX0o3jVbHTADweGfmVFueBUYFznvahEcU0TbP74b5bwI/0akZ9++BdL+OEniuHP3/+TJXz/M0lQ+oUxhr+QhUHj1y9s4VeyIVW4d4nEBsmIfYZHuawiTRCMTsvyFqrgIBg1cnktQ6o4tbsa9syQ5MQ+Q/YcDcmJfRmy50oJTqdFeatWkrDFh+OyvmHTCzZSTfbCIZHFsGiGdlYsulI7KxbDoZ0V+wzZ11I2PQ37DA++tPxgnyH70aLi8nd28G35UjYZfltayqanYd+XHjLv8sPmS5nv07Dfa2O/X8qkIdo5sehMD3tP5ce3tkPK/j4+g86UZMSeqyEZsWeI396pr0aR/oesJNAiE1Hmjn3R5RJrrobmw5oh0nwY01Inq2NLiE5s2DJEJzbsy5CpXo0zGZaE6MyFJUN05sKQmrpRYUdN3Ziwz5AZNXUnwoqvcefBipp65NhspN9eLNgQohcLJnyNNwkWfI03BwZ63357oeW3RD8Gze/KDt948NuX/5QZX37zF/KXvL9KHwtfApjZ79+XGb/7E+Qqf/y3vPgjkKf883/lxZ9BCHKN0T/KilHAc0Hvct4rjQj5PRhB7vQh76VGxEPgjGxeTiHK86AEOe6plvdqI6B2GZxgOZ1NUDdjYV0+PZXXYQhyg+ey6WnteRCKIdcsm56OQveYSqan8tewBLlBqfxp7SmkjhpoDPNedggMIx3jfi2PnsqvUQhy3GdZKMqf0QiWxhQjGaGF43KY4jBGH/utDFFxFOP/A0ZVRvEpjkJUFE4ofOAPmY464LHYFOXHuAS5wWWRHWrtMrIbxSgWOGbEiBM4TgtLsfaU0FZZq6DFYu05scPpxaSYIEFEsYCKWntK9OsFxbPFxGxwi8FlseKinESYICgWKvTLj4kTRFgXJ0cdxU7VnFGYNDxusu2O82ER/E1tGKtc8sbxU/7GKD+lenBrkHvvRv5Mw8fgeM1VU2vDiF21MGjkqKnyUyavtxh8HeUjxtroa9oaukXzOQ8xys8ZHvAdrDMXY220zkqAFhoZ56nyZfYvmJk/ZMdRfkgti/HC4D0jVc1cQfdoPGbAsTZ6zPMNSM2XlDnWRi95f0UiVY4F4GegkpauIv0syrHzxvtQTppkTR6+F+kNZK35c6KCrI2e54V7U0fl8yEhQdbkh8+iqKcdrdeX+NqKtPPltXDi2yMmyaLTs3D89vnXSK6FplmTR3+9v5Xlq2XN+d/Pw+Asa0h2z3/PixD6QmBw/LZ+QcJEPN2JomsyEt3L+u04r8wzLhpH8/fHy4fhCFE1yVow/jEaDR8uH9/nR2VRTC8MWs3K2+v863r9bmC9/jp/fas0W2WV2wEHHHAAgf8DliWD6ghIVWAAAAAASUVORK5CYII="
                           alt="">
          </a-select-option>

        </a-select>

      </a-row>
      <a-button type="danger" @click="logoutt">
        {{ $t('Выйти') }}
      </a-button>
    </div>

    <div class="res">
        <router-link class="link" style="padding: 5px 5px; margin: auto " to="create"> {{ $t('Оформить заказ') }}
        </router-link>
        <router-link class="link" style="padding: 5px 5px; margin: auto " to="driver"> {{ $t('Панель водителя') }}
        </router-link>


      <a-button type="danger" @click="logoutt">
        {{ $t('Выйти') }}
      </a-button>
    </div>

  </div>
</template>

<script>


import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapAuthActions,
} = createNamespacedHelpers('auth')

export default {
  name: "Header",
  data() {
    return {
      lang: localStorage.getItem('lang') || 'ru'
    }
  },
  methods: {
    ...mapAuthActions({
      logout: 'logout'
    })
    ,
    logoutt() {
      this.logout()
    },
    handleChange() {
      localStorage.setItem('lang', this.lang)
      window.location.reload();
    }
  }
}
</script>

<style scoped>
.no-res {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.res {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

</style>