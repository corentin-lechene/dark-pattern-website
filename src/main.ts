import {createApp} from 'vue'
import PrimeVue from 'primevue/config';

// styles
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/aura-light-indigo/theme.css';
import './style.css'

// icons
import 'primeicons/primeicons.css';

// router
import router from "./router";

import App from './App.vue'

import ToastService from 'primevue/toastservice';
import Tooltip from "primevue/tooltip";

// components
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Image from "primevue/image";
import Card from "primevue/card";
import Calendar from "primevue/calendar";
import Password from "primevue/password";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import InlineMessage from "primevue/inlinemessage";
import Divider from "primevue/divider";
import Sidebar from 'primevue/sidebar';
import Avatar from "primevue/avatar";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Textarea from "primevue/textarea";
import Menu from "primevue/menu";
import Panel from "primevue/panel";
import FileUpload from "primevue/fileupload";
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
import SplitButton from "primevue/splitbutton";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Paginator from "primevue/paginator";
import AvatarGroup from "primevue/avatargroup";
import MultiSelect from "primevue/multiselect";
import ProgressSpinner from "primevue/progressspinner";
import VirtualScroller from "primevue/virtualscroller";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";
import PickList from "primevue/picklist";
import InputNumber from "primevue/inputnumber";
import SelectButton from "primevue/selectbutton";
import Chip from "primevue/chip";
import Message from "primevue/message";

import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Listbox from "primevue/listbox";
import InputMask from "primevue/inputmask";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
    // directives
    .directive('tooltip', Tooltip)

    // plugins
    .use(pinia)
    .use(router)
    .use(PrimeVue, {
        ripple: true,
        inputStyle: "filled",
        pt: {
            tooltip: {
                root: 'text-sm'
            },
            input: {
                root: 'w-full'
            },
            password: {
                input: {
                    root: 'w-full'
                }
            },
            card: {
                body: {
                    style: 'height: 100%'
                },
                content: {
                    style: 'height: 100%'
                }
            }
        }
    })
    .use(ToastService)

    // components
    .component('Button', Button)
    .component('InputText', InputText)
    .component('Textarea', Textarea)
    .component('Calendar', Calendar)
    .component('Checkbox', Checkbox)
    .component('Image', Image)
    .component('Card', Card)
    .component('Password', Password)
    .component('Toast', Toast)
    .component('Dialog', Dialog)
    .component('InlineMessage', InlineMessage)
    .component('Divider', Divider)
    .component('SideBar', Sidebar)
    .component('Avatar', Avatar)
    .component('AvatarGroup', AvatarGroup)
    .component('IconField', IconField)
    .component('InputIcon', InputIcon)
    .component('Menu', Menu)
    .component('Panel', Panel)
    .component('FileUpload', FileUpload)
    .component('Dropdown', Dropdown)
    .component('InputSwitch', InputSwitch)
    .component('SplitButton', SplitButton)
    .component('TabView', TabView)
    .component('TabPanel', TabPanel)
    .component('DataView', DataView)
    .component('Paginator', Paginator)
    .component('MultiSelect', MultiSelect)
    .component('ProgressSpinner', ProgressSpinner)
    .component('VirtualScroller', VirtualScroller)
    .component('Splitter', Splitter)
    .component('SplitterPanel', SplitterPanel)
    .component('Stepper', Stepper)
    .component('StepperPanel', StepperPanel)
    .component('PickList', PickList)
    .component('InputNumber', InputNumber)
    .component('SelectButton', SelectButton)
    .component('Chip', Chip)
    .component('Message', Message)
    .component('Listbox', Listbox)
    .component('InputMask', InputMask)


app.mount("#app");





