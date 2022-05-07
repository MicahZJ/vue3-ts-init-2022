import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  state: {
    count: 0,
    double: 0,
  },
  getters: {
    count: state => state.count,
    double: state => state.double,
  },
  mutations: {
    increment (state) {
      state.count++;
    },
    increment2 (state, value) {
      state.double += value;
    }
  },
  actions: {
  },
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store
