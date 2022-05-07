import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  inject,
  computed
} from "vue";

import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { FormInstance } from 'element-plus'

export default defineComponent({
  components: {
  },
  setup() {
    const title = ref<string>('配电房监控');

    const ruleFormRef = ref<FormInstance>()

    const router = useRouter();

    const checkTel = (rule: any, value: any, callback: any) =>{
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (!regExp.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    }

    const checkCodeBtn = reactive<any>({
      text: '获取验证码',
      loading: false,
      disabled: false,
      duration: 60,
      timer: null
    })

    // 获取统计图数据
    interface eleInf {
      params: any,
      params2: any,
      http: any,
      getEleData(): Promise<void>,
      getVerifyCode(): Promise<void>,
    }
    const eleData:eleInf = reactive({
      http : inject('$Http'),
      params : {},
      params2 : {},
      getEleData: async () => {
        eleData.params = ruleForm
        const res =  await eleData.http.axiosPost('/register', eleData.params)
        if (res.code === 200) {
          console.log(res)
          methods.resetForm(ruleFormRef.value)
          router.push("/result");
        } else {
          ElMessage({
            message: res.msg,
            type:'warning'
          })
        }
      },
      getVerifyCode: async () => {
        eleData.params2.phone = ruleForm.phone
        const res =  await eleData.http.axiosPost('/verification/send', eleData.params2)
        if (res.code === 200) {
          console.log(res)
        } else {
          ElMessage({
            message: res.msg,
            type:'warning'
          })
        }
      },
    });

    const eleDataRefs = toRefs(eleData);

    const getCheckCode = () => {
      // 倒计时期间按钮不能单击
      if (checkCodeBtn.duration <= 60) {
        checkCodeBtn.disabled = true
      }
      // 清除掉定时器
      checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)
      // 开启定时器
      checkCodeBtn.timer = setInterval(() => {
        const tmp = checkCodeBtn.duration--
        checkCodeBtn.text = `${tmp}秒`
        if (tmp <= 0) {
          // 清除掉定时器
          clearInterval(checkCodeBtn.timer)
          checkCodeBtn.duration = 60
          checkCodeBtn.text = '重新获取'
          // 设置按钮可以单击
          checkCodeBtn.disabled = false
        }
        console.info(checkCodeBtn.duration)
      }, 6000)
      eleData.getVerifyCode()
    }

    const rules = reactive({
      company: [
        { required: true, message: '请输入公司名称', trigger: 'blur' },
      ],
      userName: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
      ],
      email: [{
        required: true,
        message: '请输入邮箱地址',
        trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的@邮箱地址',
          trigger: ['blur', 'change'],
        }
      ],
      phone: [
        {  required: true,validator: checkTel, trigger: 'blur' },
      ],
      verification: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ],
    })

    const ruleForm = reactive({
      company: '',
      userName: '',
      email: '',
      phone: '',
      verification: '',
      wechat: '',
    })

    const methods = {
      submitForm (formEl: FormInstance | undefined) {
        if (!formEl) return
        formEl.validate((valid) => {
          if (valid) {
            eleData.getEleData()
            console.log('submit!', ruleForm)
          } else {
            console.log('error submit!')
            return false
          }
        })
      },
      resetForm (formEl: FormInstance | undefined) {
        if (!formEl) return
        formEl.resetFields()
      },
      test() {
        router.push("/result");
      }
    }
    return {
      title,
      rules,
      ruleForm,
      checkCodeBtn,
      ruleFormRef,
      getCheckCode,
      ...methods,
      ...eleDataRefs,
    }
  },
})
