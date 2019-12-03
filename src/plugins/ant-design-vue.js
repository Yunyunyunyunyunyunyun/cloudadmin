import Vue from 'vue'
import {
  Avatar,
  Breadcrumb,
  Button,
  Badge,
  Checkbox,
  Calendar,
  Cascader,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Row,
  Col,
  Layout,
  List,
  message,
  Menu,
  Modal,
  notification,
  Pagination,
  Popover,
  LocaleProvider,
  TimePicker,
  Tabs,
  Table,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
  Radio,
  Select,
  Spin,
  ConfigProvider,
  Steps,
  Empty
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm

Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Badge)
Vue.use(Checkbox)
Vue.use(Calendar)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(List)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(TimePicker)
Vue.use(Table)
Vue.use(Transfer)
Vue.use(Tree)
Vue.use(TreeSelect)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Spin)
Vue.use(LocaleProvider)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(Steps)
Vue.use(Empty)

Vue.use(ConfigProvider)
