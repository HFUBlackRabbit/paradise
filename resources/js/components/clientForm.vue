<template>
      <form class="client-form" @submit.prevent="handle">
        <div class="overlay" v-if="formDisabled">
          <i class="fas fa-spinner fa-pulse fa-5x text-white"></i>
        </div>
        <div class="field-group">
          <label for="name">Имя</label>
          <div class="field">
            <i class="fas fa-user-alt"></i>
            <input type="text" name="name" id="name" v-model="form.name" required>
          </div>
        </div>
        <div class="field-group">
          <label for="tel">Номер телефона</label>
          <div class="field">
            <i class="fas fa-mobile-alt"></i>
            <input type="tel"
                   name="tel"
                   id="tel"
                   v-model="form.tel"
                   required
                   v-mask="masks[phoneMask]"
                   :placeholder="placeholders[phoneMask]"
            >
            <div class="flags">
              <div :class="{flag: true, active: phoneMask === 'ru'}" @click="phoneMask = 'ru'; form.tel = ''">
                <div class="bg-white w-full h-1/3"></div>
                <div class="bg-blue-400 w-full h-1/3"></div>
                <div class="bg-red-500 w-full h-1/3"></div>
              </div>
              <div :class="{flag: true, active: phoneMask === 'ua'}" @click="phoneMask = 'ua'; form.tel = ''">
                <div class="bg-yellow-200 w-full h-1/2"></div>
                <div class="bg-blue-300 w-full h-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="field-group">
          <label for="dob">Дата рождения</label>
          <div class="field">
            <i class="fas fa-calendar-alt"></i>
            <v-date-picker v-model="form.dob">
              <template v-slot="{ inputValue, inputEvents }">
                <input
                    :value="inputValue"
                    v-on="inputEvents"
                    name="dob"
                    id="dob"
                    required
                />
              </template>
            </v-date-picker>
          </div>
        </div>
        <input type="submit" value="Сохранить" :disabled="formDisabled">
      </form>
</template>

<script>
export default {
  name: "clientForm",
  data() {
    return {
      form: {
        name: '',
        tel: '',
        dob: new Date('01.01.1990')
      },
      phoneMask: 'ru',
      masks: {
        ru: '+7 (###) ###-##-##',
        ua: '+380 (##) ###-##-##'
      },
      placeholders: {
        ru: '+7 (000) 000-00-00',
        ua: '+380 (00) 000-00-00'
      }
    }
  },
  computed: {
    formDisabled() {
      return this.$store.state.formDisabled;
    }
  },
  methods: {
    async handle() {
      await this.$store.dispatch('submitForm', this.$data.form);
    }
  }
}
</script>