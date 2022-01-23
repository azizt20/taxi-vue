import uz from './locales/uz.json'
import ru from './locales/ru.json'
import VueI18n from "vue-i18n";
import Vue from "vue";

Vue.use(VueI18n)

export default new  VueI18n({
    locale: localStorage.getItem('lang') || 'ru',
    messages: {
        ru: ru,
        uz: uz
    }
})
