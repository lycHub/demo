import Vue from 'vue';
import { Message, Breadcrumb, BreadcrumbItem, Transfer, CheckboxGroup, Checkbox, Collapse, Panel, Dropdown, DropdownMenu, DropdownItem, CellGroup, Cell, Modal, Notice, Steps, Step, Spin, Tooltip, Table, Page, ButtonGroup, Button, Layout, Header, Menu, Submenu, MenuItem, Sider, Icon, Card, Form, FormItem, Select, Option, DatePicker, Input, Row, Col } from 'iview';

const components = {
    Message,
    Breadcrumb,
    BreadcrumbItem,
    Transfer,
    CheckboxGroup,
    Checkbox,
    Collapse,
    Panel,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Cell,
    CellGroup,
    Button,
    Layout,
    Header,
    Menu,
    MenuItem,
    Submenu,
    Sider,
    Table,
    Page,
    ButtonGroup,
    Icon,
    Card,
    Form,
    FormItem,
    Select,
    Option,
    DatePicker,
    Row,
    Tooltip,
    Spin,
    Steps,
    Step,
    Modal,
    'i-Col': Col,
    'i-Input': Input
}


Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Message = Message;
Vue.prototype.$Spin = Spin;

for (const attr in components) {
    if (components.hasOwnProperty(attr)) {
        Vue.component(attr, components[attr]);
    }
}



// 全局配置
Message.config({
    top: 50,
    duration: 3
});