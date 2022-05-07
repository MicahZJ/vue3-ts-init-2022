import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  inject,
  computed
} from "vue";

import { ElMessage } from 'element-plus'
import {useStore} from 'vuex';
import { FormInstance } from 'element-plus'

export default defineComponent({
  components: {
  },
  setup() {
    const title = ref<string>('xx');

    const store = useStore()

    const count = computed(() => store.getters.count)
    const double = computed(() => store.getters.double)
    const methods = {
      test() {
        store.commit('increment')
      },
      test2() {
        store.commit('increment2', 2)
      }
    }
    return {
      count,
      double,
      ...methods,
    }
  },
})
