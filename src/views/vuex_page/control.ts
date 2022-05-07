import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  inject,
  computed
} from "vue";

import { ElMessage } from 'element-plus'
import { FormInstance } from 'element-plus'

export default defineComponent({
  components: {
  },
  setup() {
    const title = ref<string>('配电房监控');

    // 获取统计图数据
    interface eleInf {
      params: any,
      params2: any,
      http: any,
      getEleData(): Promise<void>,
    }
    const eleData:eleInf = reactive({
      http : inject('$Http'),
      params : {},
      params2 : {},
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

    const methods = {
      resetForm (formEl: FormInstance | undefined) {
        if (!formEl) return
        formEl.resetFields()
      }
    }
    return {
      title,
      ...methods,
    }
  },
})
