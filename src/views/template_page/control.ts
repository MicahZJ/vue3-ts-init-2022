import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  inject,
  computed
} from "vue";

import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
  },
  setup() {
    const title = ref<string>('XX');

    // 获取统计图数据
    interface eleInf {
      params: any,
      http: any,
      getEleData(): Promise<void>,
    }
    const eleData:eleInf = reactive({
      http : inject('$Http'),
      params : {},
      getEleData: async () => {
        const res =  await eleData.http.axiosPost('/register', eleData.params)
        if (res.code === 200) {
          console.log(res)
        } else {
          ElMessage({
            message: res.msg,
            type:'warning'
          })
        }
      }
    });

    const eleDataRefs = toRefs(eleData);

    const iconSrc = ref<string>(require('@/assets/images/back_img.jpg'));

    const methods = {}
    return {
      iconSrc,
      ...methods,
    }
  },
})
