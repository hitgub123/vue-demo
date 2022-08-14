import ElementPlus from 'element-plus'
import { App } from 'vue'
import '../element-variables.scss'

export default (app: { use: (arg0: { version: string; install: (app: App<any>, opt: any) => void; locale: any }) => void }) => {
  app.use(ElementPlus)
}
