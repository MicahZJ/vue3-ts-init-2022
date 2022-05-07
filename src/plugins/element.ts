
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app:any) => {
  app.use(ElementPlus, {locale})
}
