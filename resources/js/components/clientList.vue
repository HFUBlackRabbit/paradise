<template>
  <div class="clients-list">
    <div class="container">
      <div class="search ">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Имя или номер телефона" v-model="search">
      </div>
      <table>
        <thead>
        <tr>
          <th scope="col" @click="order('id')">
            ID
            <i class="fas fa-sort-alpha-down" v-if="this.sort === 'id' && type === 'asc'"></i>
            <i class="fas fa-sort-alpha-down-alt" v-if="this.sort === 'id' && type === 'desc'"></i>
          </th>
          <th scope="col" @click="order('name')">
            Имя
            <i class="fas fa-sort-alpha-down" v-if="this.sort === 'name' && type === 'asc'"></i>
            <i class="fas fa-sort-alpha-down-alt" v-if="this.sort === 'name' && type === 'desc'"></i>
          </th>
          <th scope="col" @click="order('tel')">
            Телефон
            <i class="fas fa-sort-alpha-down" v-if="this.sort === 'tel' && type === 'asc'"></i>
            <i class="fas fa-sort-alpha-down-alt" v-if="this.sort === 'tel' && type === 'desc'"></i>
          </th>
          <th scope="col" @click="order('dob')">
            Дата рождения
            <i class="fas fa-sort-alpha-down" v-if="this.sort === 'dob' && type === 'asc'"></i>
            <i class="fas fa-sort-alpha-down-alt" v-if="this.sort === 'dob' && type === 'desc'"></i>
          </th>
          <th scope="col" @click="order('created_at')">
            Создан
            <i class="fas fa-sort-alpha-down" v-if="this.sort === 'created_at' && type === 'asc'"></i>
            <i class="fas fa-sort-alpha-down-alt" v-if="this.sort === 'created_at' && type === 'desc'"></i>
          </th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients">
              <td>
                {{ client.id }}
              </td>
              <td>
                {{ client.name }}
              </td>
              <td>
                {{ client.tel }}
              </td>
              <td>
                {{ new Date(client.dob).toLocaleDateString('ru-RU') }}
              </td>
              <td>
                {{ new Date(client.created_at).toLocaleString('ru-RU') }}
              </td>
              <td>
                <button class="delete text-red-600" @click.prevent="remove(client)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "clientList",
  data() {
    return {
      sort: 'id',
      type: 'asc',
      search: '',
    }
  },
  computed: {
    clients() {
      return this.$store.state.clients;
    },
    filteredClients() {
      let clients = this.orderedClients,
          search = this.search.toLowerCase().trim();

        return this.search.length > 0 ? clients.filter(client => {
          return client.name.toLowerCase().includes(search) || client.tel.replace(/\D+/g, '').includes(search);
        }) : clients;
    },
    orderedClients() {
      let clients = this.clients,
          field = this.sort,
          order = this.type === 'asc' ? 1 : -1;


      clients.sort((a, b) => {
        let result = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
        return result * order;
      })

      return clients;
    }
  },
  methods: {
    order(field) {
      console.log(field, this.sort === field, this.type, this.type === 'asc' ? 'desc' : 'asc');
      if (this.sort === field) {
        this.type = this.type === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort = field;
        this.type = 'asc';
      }
    },
    remove(client) {
      if (confirm(`Удалить клиента ${client.name}`)) {
        this.$store.dispatch('deleteClient', client.id);
      }
    }
  },
  mounted() {
    this.$store.dispatch('loadClients');
  }
}
</script>