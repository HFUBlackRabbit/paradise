<template>
      <form class="client-form" @submit.prevent="handle">
        <div class="overlay" v-if="formDisabled">
          <i class="fas fa-spinner fa-pulse fa-5x text-white"></i>
        </div>
        <div class="field-group">
          <label for="name">Имя</label>
          <div class="field">
            <i class="fas fa-user-alt"></i>
            <input type="text" name="name" id="name" v-model="name" required>
          </div>
        </div>
        <div class="field-group">
          <label for="tel">Номер телефона</label>
          <div class="field">
            <i class="fas fa-mobile-alt"></i>
            <input type="tel" name="tel" id="tel" v-model="tel" required>
          </div>
        </div>
        <div class="field-group">
          <label for="dob">Дата рождения</label>
          <div class="field">
            <i class="fas fa-calendar-alt"></i>
            <input type="text" name="dob" id="dob" v-model="dob" required>
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
      name: '',
      tel: '',
      dob: ''
    }
  },
  computed: {
    formDisabled() {
      return this.$store.state.formDisabled;
    }
  },
  methods: {
    async handle() {
      await this.$store.dispatch('submitForm', this.$data);
    }
  }
}
</script>