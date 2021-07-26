import {createStore} from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            formDisabled: false,
            clients: []
        }
    },
    getters: {},
    mutations: {
        toggleForm(state, status) {
            state.formDisabled = status;
        },
        setClients(state, clients) {
            state.clients = clients;
        }
    },
    actions: {
        async submitForm({ commit, state }, data) {
            this.commit('toggleForm', true)
            let post = {
                name: data.name,
                tel: data.tel,
                dob: data.dob.toLocaleDateString('ru-RU')
            }
            await axios.post('/api/clients', post)
                .then(r => {
                    this.commit('setClients', [...state.clients, r.data.data]);
                    data.name = data.tel = '';
                    data.dob = new Date('01.01.1990');
                })
                .catch(e => alert(e));
            this.commit('toggleForm', false)

        },
        loadClients() {
            axios.get('/api/clients')
                .then(r => this.commit('setClients', r.data.data))
                .catch(e => alert(e));
        },
        deleteClient({ commit, state }, id) {
            axios.delete(`/api/clients/${id}`)
                .then(r => this.dispatch('loadClients'))
                .catch(e => alert(e))
        }
    }
})

export default store;