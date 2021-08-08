import { createApp } from "vue";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      items: [],
    };
  },
  mutations: {},
  actions: {
    vm : this,
    async fetchItems({ commit }) {
      const response = await axios.get(
        'https://api.github.com/search/repositories?q=created:>2019-08-09&sort=stars&order=desc&page=1'
      ).then((response) => {
        vm.items = response.data.items;
      });
    },
  },
});

export default {
  state,
  getters,
  mutations,
  actions,
};

const app = createApp({ App });
// Install the store instance as a plugin
app.use(store);
